import RegisterForm from "@/app/(auth)/register/register-form";
import { ModeToggle } from "@/components/mode-toggle";

const RegisterPage = () => {
  return (
  <div className="flex justify-center mt-10">
    {/* <ModeToggle /> */}
    <RegisterForm/>
  </div>
  )
};

export default RegisterPage;
