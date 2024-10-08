"use client";

import Link from "next/link";
import GoogleLogin from "../googleLogin/GoogleLogin";
import { useSignupForm } from "./useSignupForm";
import FormInputField from "../formInputField/FormInputField";
import { signupFields } from "@/constants/Constants";

const SignupForm: React.FC = () => {
  const {
    user,
    showPassword,
    usernameError,
    handleChange,
    handleUserRegister,
    togglePasswordVisibility,
    getPasswordStrength,
    signupLoading,
  } = useSignupForm();

  return (
    <div>
      <div className="border sm:w-[440px] rounded-lg pb-6 my-2 shadow text-left mx-auto">
        <form onSubmit={handleUserRegister}>
          <div className="px-3 sm:px-[33px] sm:pt-[28px]">
            {signupFields?.map((field) => (
              <div key={field?.id}>
                <FormInputField
                  id={field?.id}
                  name={field?.name}
                  type={field?.type}
                  value={user?.[field?.name as keyof typeof user]}
                  placeholder={field?.placeholder}
                  required={field?.required}
                  label={field?.label}
                  minLength={field?.minLength}
                  maxLength={field?.maxLength}
                  showPassword={
                    field?.name === "password" ? showPassword : undefined
                  }
                  togglePasswordVisibility={
                    field?.name === "password"
                      ? togglePasswordVisibility
                      : undefined
                  }
                  onChange={handleChange}
                  className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                />
                {field?.name === "username" && usernameError && (
                  <p className="text-danger text-[12px] mt-1">
                    {usernameError}
                  </p>
                )}
              </div>
            ))}
            <div className="mt-1 h-[60px] flex flex-col justify-around">
              <div className="h-1 bg-gray-200 rounded">
                <div
                  className="h-full bg-primary rounded"
                  style={{ width: `${getPasswordStrength(user?.password)}%` }}
                ></div>
              </div>
              <div className="h-[42px] min-w-[297.28px] ml-5">
                <p className="text-sm text-danger text-[12.91px] leading-[21px]">
                  Use a few words, avoid common phrases
                </p>
                <p className="text-sm text-danger text-[12.91px] leading-[21px]">
                  No need for symbols, digits or uppercase letters
                </p>
              </div>
            </div>
          </div>
          <div className="sm:w-[400px] h-[29px] mx-auto mt-6 max-sm:px-3 text-center">
            <p className="text-[12px] leading-[18px]">
              By creating a Calendly account, you agree to{" "}
              <Link className="text-primary hover:text-blue-400" href={"#"}>
                Calendly's Terms
              </Link>{" "}
              and{" "}
              <Link className="text-primary hover:text-blue-400" href={"#"}>
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-primary hover:bg-blue-500 w-[92px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px]"
              type="submit"
            >
              {signupLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-t-4 border-t-white border-dark/40 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-[12.91px]">
            Already have an account?{" "}
            <Link
              className="text-primary hover:text-blue-400"
              href={"/auth/login"}
            >
              Login Here
            </Link>
          </p>
        </div>

        <div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center mt-2">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
