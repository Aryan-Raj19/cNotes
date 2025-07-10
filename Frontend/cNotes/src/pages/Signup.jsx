import { useForm } from "react-hook-form";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    const res = await API.post("/auth/signup", data);
    setUser(res.data);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <input {...register("name")} placeholder="Name" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}
