import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
};

const roles = ["admin", "user"];

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signUp(data).unwrap();
      toast.success("Sign up successfully");
    } catch (err) {
      console.error("Failed to sign up:", err);
      toast.error("Sign up failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Sign Up</h2>

        {[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
          { name: "phone", label: "Phone Number" },
          { name: "address", label: "Address" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {label}:
            </label>
            <Controller
              name={name as keyof FormData}
              control={control}
              defaultValue=""
              rules={{ required: `${label} is required` }}
              render={({ field }) => (
                <input
                  {...field}
                  type={type}
                  className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[name as keyof FormData]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors[name as keyof FormData] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[name as keyof FormData]?.message}
              </span>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Role:
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.role && (
            <span className="text-red-500 text-sm mt-1">
              {errors.role.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 transition-all"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
