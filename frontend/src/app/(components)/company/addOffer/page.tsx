"use client";

import "@radix-ui/themes/styles.css";
import { useAddOfferMutation } from "app/store/slices/companyApiSlices";
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from "components/companyComponents/aside/page";
import { getUserIdFromToken } from "utils/tokenHelper";
import { useFormik } from "formik";
import { offerValidationSchema } from "app/schema/validation";
import toast, { Toaster } from "react-hot-toast";
import AuthHOC,{Role} from "components/common/auth/authHoc";
import { isApiError } from "utils/errors";

export default function Page() {
  const router = useRouter()
  const [addOffer] = useAddOfferMutation();

  const companyId = getUserIdFromToken("authCompanyToken");

  const formik = useFormik({
    initialValues: {
      name: "",
      percentage: "",
      validity: "",
    },
    validationSchema: offerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const loadingToast = toast.loading("Adding...");

        const response = await addOffer({ companyId, values }).unwrap();
        toast.dismiss(loadingToast);
        console.log(response);

        if (response.success) {
          toast.success(<b>Offer Added Successfully!</b>);
        } else {
          toast.error(<b>Could not Add.</b>);
        }
        resetForm();
      } catch (error: unknown) {
        toast.dismiss();
        toast.error(<b>Error occurred.</b>);
        if (isApiError(error) && error.status === 401) {
          localStorage.removeItem("authCompanyToken");
          router.push("/company/login");
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    },
  });

  return (
    <AuthHOC role={Role.Company} >
    <>
    <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px] bg-slate-100">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside />
        </aside>
        <div className="flex-1 p-4 h-screen">
          <div className="m-5">
            <h1 className="font-extrabold text-2xl mt-5 mb-5">Add Offer</h1>
            <form
              onSubmit={formik.handleSubmit}
              className="max-w-full rounded overflow-hidden shadow-lg p-6 bg-white"
            >
              <h1 className="font-extrabold text-lg mb-3 text-center font-sans">
                Offer Details
              </h1>
              <hr />
              <div className="px-2 m-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Offer Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="w-full border-slate-200 bg-slate-50 px-3 py-2 shadow-black rounded-md text-gray-700 focus:outline-none"
                  placeholder="Offer Name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="px-2 m-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="percentage"
                >
                  Offer Percentage
                </label>
                <input
                  id="percentage"
                  type="number"
                  {...formik.getFieldProps("percentage")}
                  className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
                  placeholder="Offer percentage"
                />
                {formik.touched.percentage && formik.errors.percentage ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.percentage}
                  </div>
                ) : null}
              </div>
              <div className="px-2 m-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="validity"
                >
                  Offer Validity (days)
                </label>
                <input
                  id="validity"
                  type="number"
                  {...formik.getFieldProps("validity")}
                  className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Offer validity"
                />
                {formik.touched.validity && formik.errors.validity ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.validity}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="focus:outline-none m-2 text-white bg-[rgb(255,0,0)] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-1 me-2 mb-2 dark:bg-[rgb(255,0,0)] dark:hover:bg-red-700 dark:focus:ring-red-900 transition-transform duration-300 transform hover:scale-105"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    </AuthHOC>
  );
}
