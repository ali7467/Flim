// ======================================
// FILMKEYFI AUTH UI
// Gerçek Supabase bağlantısı sonraki
// aşamada bu dosyaya eklenecek.
// ======================================


// Şifre göster / gizle

document
    .querySelectorAll(".show-password")
    .forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.target;

            const input =
                document.getElementById(targetId);

            if (!input) return;


            if (input.type === "password") {

                input.type = "text";

                button.textContent = "◉";

            } else {

                input.type = "password";

                button.textContent = "◉";

            }

        });

    });


// ======================================
// LOGIN
// ======================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async event => {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value;


        const message =
            document.getElementById("loginMessage");

        const button =
            document.getElementById("loginButton");


        message.textContent = "";

        button.disabled = true;

        button.textContent = "Giriş yapılıyor...";


        try {

            /*
             * BURADA HENÜZ ŞİFRE KONTROLÜ YAPILMIYOR.
             *
             * Bir sonraki aşamada:
             *
             * Supabase Auth
             * +
             * server-side admin kontrolü
             *
             * bağlanacak.
             */


            await new Promise(
                resolve => setTimeout(resolve, 700)
            );


            message.textContent =
                "Üyelik sistemi henüz bağlanmadı. Bir sonraki adımda aktif edeceğiz.";

            message.style.color =
                "#ffb347";


        } catch (error) {

            console.error(error);

            message.textContent =
                "Bir hata oluştu.";

        } finally {

            button.disabled = false;

            button.textContent = "Giriş Yap";

        }

    });

}


// ======================================
// REGISTER
// ======================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document.getElementById("registerName")
                    .value
                    .trim();

            const email =
                document.getElementById("registerEmail")
                    .value
                    .trim();

            const password =
                document.getElementById("registerPassword")
                    .value;

            const passwordAgain =
                document.getElementById(
                    "registerPasswordAgain"
                ).value;


            const message =
                document.getElementById(
                    "registerMessage"
                );

            const button =
                document.getElementById(
                    "registerButton"
                );


            if (password !== passwordAgain) {

                message.textContent =
                    "Şifreler aynı değil.";

                message.style.color =
                    "#ff6977";

                return;

            }


            if (password.length < 8) {

                message.textContent =
                    "Şifre en az 8 karakter olmalı.";

                message.style.color =
                    "#ff6977";

                return;

            }


            button.disabled = true;

            button.textContent =
                "Hesap oluşturuluyor...";


            try {

                /*
                 * Gerçek hesap oluşturma işlemi
                 * Supabase Auth'a taşınacak.
                 *
                 * Şifreyi localStorage'a,
                 * sessionStorage'a veya
                 * kendi veritabanımıza yazmayacağız.
                 */


                await new Promise(
                    resolve => setTimeout(resolve, 700)
                );


                message.textContent =
                    "Üyelik sistemi bir sonraki adımda aktif olacak.";

                message.style.color =
                    "#ffb347";


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Kayıt sırasında hata oluştu.";

            } finally {

                button.disabled = false;

                button.textContent =
                    "Hesap Oluştur";

            }

        }
    );

}


// ======================================
// ŞİFRE SIFIRLAMA
// ======================================

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        event => {

            event.preventDefault();

            alert(
                "Şifre sıfırlama sistemi Supabase bağlandıktan sonra aktif olacak."
            );

        }
    );

}


// ======================================
// GOOGLE LOGIN
// ======================================

const googleLogin =
    document.getElementById(
        "googleLogin"
    );


if (googleLogin) {

    googleLogin.addEventListener(
        "click",
        () => {

            alert(
                "Google giriş sistemi Supabase Auth bağlantısından sonra aktif olacak."
            );

        }
    );

}
