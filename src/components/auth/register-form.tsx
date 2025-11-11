import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long!"),
    email: z.string().email("Please enter a valid email address !"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ["confirmPassword"],

    //Because .refine() validates the entire object, Zod doesn’t know which specific field should show the error.
    // So we use path to target a field.
  });
type RegisterFormvalues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  //initilaze form
  const form = useForm<RegisterFormvalues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Form {...form}>
      <form action="" className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

// type loginFormValues = {
//   name: string;
//   email: string;
// };
// export default function LoginForm() {
//   const {
//     register,
//     formState: { errors, isLoading, isSubmitting },
//   } = useForm<loginFormValues>({
//     defaultValues: {
//       name: "Pratik",
//       email: "abc@gmail.com",
//     },
//   });
//   return (
//     <Form {...form}>
//       <div>
//         <label htmlFor="">FirstName</label>
//         <input {...register("name", { required: "Name Is Reqd." })} />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>
//     </Form>
//   );
// }
