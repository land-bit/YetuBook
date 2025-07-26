import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "../../supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  const handleLoginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLoginFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  };

  return (
    <div className="bg-[url('bg-login-light.png')] bg-cover bg-no-repeat bg-center bg-fixed w-full h-screen flex items-center">
      <div className="flex lg:flex-row flex-col w-full lg:w-[80%] items-center lg:justify-around gap-20">
        <div className="lg:w-1/2 w-[80%]">
          <h2 className="lg:text-7xl text-6xl 2xl:text-9xl font-bold text-center logo">
            Yetubook
          </h2>
          <p className="text-3xl/15 font-light text-center">
            Le réseau social des étudiants{" "}
            <span className="bg relative inline-block before:absolute before:-inset-0 before:block before:-skew-y-6">
              <span className="relative text-white font-bold dark:text-gray-950">
                ambitieux
              </span>
            </span>
            {" !"}
          </p>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <Card className="p-8 min-w-1/2">
            <CardHeader className="text-center mb-[10%]">
              <CardTitle className="text-2xl">
                Connecte-toi maintenant et fais partie du changement !
              </CardTitle>
              <CardDescription>
                Connectez-vous avec votre compte Facebook ou Google
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4 mb-[10%]">
                  <Button
                    variant="outline"
                    className="w-full text-lg"
                    onClick={handleLoginFacebook}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" />
                    </svg>
                    Login with Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-lg"
                    onClick={handleLoginGoogle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Partage tes expériences
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
