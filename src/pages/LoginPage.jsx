import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import Nav from "../components/Navbar";
import { supabase } from "../supabase/client";

/*
Cosas que faltan:
 - Recuperar contraseña
 - Añadir funcionalidad de inicio de sesion con google y apple
*/

function LoginPage() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="flex-grow flex justify-center items-start py-12 pt-28 px-10">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-8">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
              Iniciar sesión
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center md:text-left">
              ¿Eres nuevo?{" "}
              <Link to={`/register`} className="text-blue-500">
                {" "}
                Crea una cuenta
              </Link>
            </p>
            <LoginForm />
            <div className="flex items-center">
              <p>
                ¿Has olvidado tu contraseña?{" "}
                <a className="text-blue-500 cursor-pointer">
                  Recuperar contraseña
                </a>
              </p>
            </div>
            <div className="flex mt-4 items-center w-full gap-4">
              <div className="flex-1 h-0.5 bg-gray-300"></div>
              <span className="text-sm font-bold text-gray-700">O</span>
              <div className="flex-1 h-0.5 bg-gray-300"></div>
            </div>
            <div className="flex flex-col items-center w-full gap-1 mt-4 md:flex-row md:justify-center">
              <button
                type="button"
                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                onClick={signInWithGoogle}
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Inicia sesión con Google
              </button>
              <button
                type="button"
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                Inicia sesión con Apple
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="277.763"
              height="412"
              viewBox="0 0 277.763 412"
            >
              <g id="Illustration" transform="translate(24.158)">
                <path
                  id="Path"
                  d="M672.619,252.119a17.87,17.87,0,0,1-12.285-3.259,33.7,33.7,0,0,1-8.81-9.45,61.233,61.233,0,0,1-8.622-20.034,11.744,11.744,0,0,1-11.443,3.981c-6.816-1.53-10.9-9.483-9.575-16.342s6.956-12.3,13.377-15.048,13.577-3.207,20.563-3.192c4.607.01,9.3.225,13.628,1.805s8.291,4.729,9.829,9.071c.964,2.723.932,5.736,2.028,8.408,1.989,4.851,7.149,7.5,11.992,9.51s10.107,4.051,12.963,8.448c3.225,4.965,2.294,11.9-1.26,16.631s-9.261,7.482-15.07,8.63-11.792.864-17.706.576"
                  transform="translate(-515.612 -188.775)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-2"
                  data-name="Path"
                  d="M420.438,428.775l19.085-8.276-10.356-21.314-15.413,9.02Z"
                  transform="translate(-210.564 -53.502)"
                  fill="#b28b67"
                />
                <path
                  id="Path-3"
                  data-name="Path"
                  d="M419.742,300.409,438.175,337.9,470.7,404.073l33.538-16.116L467.219,301.28l-.1-10.911-.331-33.952Z"
                  transform="translate(-280.468 -34.423)"
                  fill="#db2721"
                />
                <path
                  id="Path-4"
                  data-name="Path"
                  d="M546.937,410.754l19.6,6.969,6.969-22.649-17.422-3.919Z"
                  transform="translate(-459.931 -52.429)"
                  fill="#b28b67"
                />
                <path
                  id="Path-5"
                  data-name="Path"
                  d="M702.583,370.373l59.236-16.987L744.4,341.626,698.663,356l-20.68,4.963a10.219,10.219,0,0,0-6.938,14.123h0a10.22,10.22,0,0,0,14.237,4.775Z"
                  transform="translate(-611.221 -209.257)"
                  fill="#b28b67"
                />
                <path
                  id="Path-6"
                  data-name="Path"
                  d="M674.974,331.58l23.956,13.938c2.114-17.431-8.308-48.459-21.342-82.321h0a26.048,26.048,0,0,0-10.534,24.6Z"
                  transform="translate(-545.718 -198.751)"
                  fill="#fbfbfb"
                />
                <path
                  id="Path-7"
                  data-name="Path"
                  d="M573.031,374.487l.5,17.879a10.311,10.311,0,0,0,12.974,9.669h0a10.311,10.311,0,0,0,6.708-14.25l-6.683-14.6-20.907-49.654-14.374,5.227Z"
                  transform="translate(-340.547 -206.837)"
                  fill="#b28b67"
                />
                <ellipse
                  id="Path-8"
                  data-name="Path"
                  cx="18.729"
                  cy="18.729"
                  rx="18.729"
                  ry="18.729"
                  transform="translate(116.407 9.378)"
                  fill="#b28b67"
                />
                <path
                  id="Path-9"
                  data-name="Path"
                  d="M503.565,72.567l21.778-10.454L514.454,37.722,496.16,41.207Z"
                  transform="translate(-367.776 -5.041)"
                  fill="#b28b67"
                />
                <path
                  id="Path-10"
                  data-name="Path"
                  d="M642.087,352.5l44.427-10.889-8.921-81.778a14.386,14.386,0,0,0-15.6-12.766L647.314,248.4l-20.036,9.147-7.4,7.84,2.259,9.662c-2.106,19.9-.483,37.169,11.088,47.417Z"
                  transform="translate(-492.36 -196.557)"
                  fill="#fbfbfb"
                />
                <path
                  id="Path-11"
                  data-name="Path"
                  d="M618.787,321.764l23.085-6.1-30.949-51.26a33.107,33.107,0,0,0-31.772-15.817h0l11.76,38.765C601.785,295.56,610.92,307.353,618.787,321.764Z"
                  transform="translate(-412.437 -196.744)"
                  fill="#fbfbfb"
                />
                <path
                  id="Path-12"
                  data-name="Path"
                  d="M604.657,550.8l35.28,10.453c42.96-69.744,104.477-144.906,80.579-195.131L711.8,345.648l-45.3,13.938-2.613,54.01-27.876,43.556Z"
                  transform="translate(-518.521 -209.895)"
                  fill="#ff4133"
                />
                <path
                  id="Path-13"
                  data-name="Path"
                  d="M724.389,631.848l31.354-.308a11.294,11.294,0,0,0,11.22-11.294v-15.63a3.6,3.6,0,0,0-4.67-3.456c-5.663,1.816-10.3,1.211-13.8-2.08-2.1-1.973-2.341-2.369-4.836-.934L729.5,613.608l-5.741.37a8.944,8.944,0,0,0-8.343,8.256h0a8.944,8.944,0,0,0,8.969,9.613Z"
                  transform="translate(-655.565 -243.523)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-14"
                  data-name="Path"
                  d="M579.384,653.664l21.953-22.388a11.294,11.294,0,0,0-.052-15.919L590.232,604.3a3.6,3.6,0,0,0-5.746.858c-2.721,5.289-6.427,8.14-11.227,8.285-2.877.087-3.331-.02-4.08,2.759l.924,20.943-3.8,4.321a8.944,8.944,0,0,0-.061,11.738h0a8.944,8.944,0,0,0,13.139.455Z"
                  transform="translate(-362.101 -244.319)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-15"
                  data-name="Path"
                  d="M661.865,213.4A22.423,22.423,0,0,1,651,222.373c-3.182,1.225-7.219,1.53-9.607-.9-1.73-1.763-2.075-4.476-1.829-6.933.766-7.671,6.532-14.351,13.685-17.225s15.412-2.246,22.551.664c6.736,2.746,13.133,8.37,13.495,15.635.186,3.723-1.162,7.822.836,10.969,1.505,2.37,4.412,3.333,7.016,4.382s5.4,2.705,5.933,5.462a6.111,6.111,0,0,1-1.793,5.21,14.146,14.146,0,0,1-4.816,3.02c-4.247,1.808-8.921,2.935-13.483,2.236s-8.974-3.477-10.759-7.733c-1.375-3.278-1.093-6.976-.935-10.527s.111-7.332-1.785-10.339-6.3-4.69-9.131-2.543"
                  transform="translate(-525.974 -189.666)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-16"
                  data-name="Path"
                  d="M543.875,436.93h44.4a23.805,23.805,0,1,1,0,10.751H576.9v3.84a5.375,5.375,0,0,1-10.751,0v-3.84h-7.679v9.983a5.375,5.375,0,0,1-10.751,0V447.68h-3.839a5.375,5.375,0,1,1,0-10.751Zm67.576,18.43A13.054,13.054,0,1,0,598.4,442.305,13.069,13.069,0,0,0,611.451,455.359Z"
                  transform="translate(-257.458 -543.618) rotate(30)"
                  fill="#3d3d3d"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
