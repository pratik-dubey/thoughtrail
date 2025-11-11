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
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address !"),
  password: z.string().min(8, "Password must be at least 6 characters long"),
});
type loginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  //initilaze form
  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitFunction = async (values: loginFormValues) => {
    setLoading(true);
    try {
      console.log(values);
    } catch (error) {}
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFunction)}
        action=""
        className="space-y-4"
      >
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
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Signing in" : "Sign in"}
        </Button>
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
