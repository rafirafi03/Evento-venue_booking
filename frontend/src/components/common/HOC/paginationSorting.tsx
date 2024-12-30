import React, { useState, useEffect } from "react";

type PaginationSortingProps<T> = {
  data: T[];
  itemsPerPage: number;
  defaultSortField?: keyof T;
  searchFields: (keyof T)[];
};

export default function withPaginationSorting<T>(
  WrappedComponent: React.ComponentType<{
    data: T[];
    onSearch: (query: string) => void;
    onSort: (field: keyof T, direction: "asc" | "desc") => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }>
) {
  return function EnhancedComponent(props: PaginationSortingProps<T>) {
    const { data, itemsPerPage, defaultSortField, searchFields } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<keyof T | null>(
      defaultSortField || null
    );
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
      // Filter and sort the data
      let result = [...data];

      // Search filtering
      if (searchQuery) {
        result = result.filter((item) =>
          searchFields.some((field) =>
            String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      // Sorting
      if (sortField) {
        result.sort((a, b) => {
          if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }

      setFilteredData(result);
      setCurrentPage(1); // Reset to first page if data changes
    }, [data, searchQuery, sortField, sortDirection, searchFields]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const onSearch = (query: string) => setSearchQuery(query);
    const onSort = (field: keyof T, direction: "asc" | "desc") => {
      setSortField(field);
      setSortDirection(direction);
    };
    const onPageChange = (page: number) => setCurrentPage(page);

    return (
      <WrappedComponent
        data={paginatedData}
        onSearch={onSearch}
        onSort={onSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };
}
