import { Link } from "react-router-dom";
import TeachersRegisterForm from "../components/TeachersRegisterForm";
import Nav from "../components/Navbar";
import { supabase } from "../supabase/client";

function RegisterPage() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="flex-grow flex justify-center items-start py-12 px-10">
        <div className="flex flex-col items-center md:jusitfy-center md:flex-row md:gap-8 ">
          <div className="max-w-md flex-1">
            <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
              Regístrate
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center md:text-left">
              ¿Ya tienes una cuenta?{" "}
              <Link to={`/login`} className="text-blue-500">
                {" "}
                Inicia Sesión
              </Link>
            </p>
            <TeachersRegisterForm></TeachersRegisterForm>
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
                Registrate con Google
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
                Registrate con Apple
              </button>
            </div>
          </div>
          <div className="hidden lg:block flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="380.596"
              height="361.779"
              viewBox="0 0 380.596 361.779"
            >
              <g id="Illustration" transform="translate(71.877 34.602)">
                <path
                  id="Path"
                  d="M96.021,80.211c8.061.6,11.733,8.112,38.33-6.413S180.12-4.086,226.028,1.532s66.838,31.447,74.59,78.026-11.281,70.95-16.267,98.808-49.672,65.249-118.38,35.142S73.282,188.214,39.88,195.568s-54.941-31.6-24.214-78.335S87.959,79.615,96.021,80.211Z"
                  transform="matrix(0.788, -0.616, 0.616, 0.788, -73.283, 150.675)"
                  fill="#cfcfcf"
                />
                <path
                  id="Path-2"
                  data-name="Path"
                  d="M231.337,182.945h113a24.742,24.742,0,0,1,24,19l57,256c1.265,5.65-.518,11.389-4,16s-8.253,7.715-14,8l-117,5c-12.916.641-23.7-8.191-26-21l-33-181-2,1-6-34,2-1-9-51a14.257,14.257,0,0,1,3-12C222.185,184.541,226.916,182.908,231.337,182.945Z"
                  transform="translate(-216.292 -170.478)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-3"
                  data-name="Path"
                  d="M341.889,194.054h13c7.834,0,15.33,6.3,17,14l55,253a11.768,11.768,0,0,1-2,9,11.059,11.059,0,0,1-8,4l-116,8a13.317,13.317,0,0,1-14-11l-47-263c-.615-3.437.775-6.32,3-9s5.53-5,9-5h12c2.5,0,5.35,1.571,6,4h0c.574,2.145,1.794,4,4,4h60C338.248,202.054,341.555,198.429,341.889,194.054Z"
                  transform="translate(-228.844 -176.587)"
                  fill="#fff"
                />
                <circle
                  id="Path-4"
                  data-name="Path"
                  cx="17.5"
                  cy="17.5"
                  r="17.5"
                  transform="translate(250.045 54.467)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-5"
                  data-name="Path"
                  d="M723.563,693.747l3,14h-8l-3-16Z"
                  transform="translate(-437.518 -403.28)"
                  fill="#b28b67"
                />
                <path
                  id="Path-6"
                  data-name="Path"
                  d="M641.218,695.849v14h-8v-14Z"
                  transform="translate(-394.173 -405.382)"
                  fill="#b28b67"
                />
                <path
                  id="Path-7"
                  data-name="Path"
                  d="M810.672,450.612s-.057,20.576-1,22-10,22-10,22l-4-13s6.943-10.831,6-17a116.728,116.728,0,0,1-1-14Z"
                  transform="translate(-522.627 -311.145)"
                  fill="#b28b67"
                />
                <circle
                  id="Path-8"
                  data-name="Path"
                  cx="13.5"
                  cy="13.5"
                  r="13.5"
                  transform="translate(248.045 63.467)"
                  fill="#b28b67"
                />
                <path
                  id="Path-9"
                  data-name="Path"
                  d="M776.171,322.348s-.3,19.153,3,22-19,0-19,0,4.771-13.153,1-16S776.171,322.348,776.171,322.348Z"
                  transform="translate(-504.126 -243.881)"
                  fill="#b28b67"
                />
                <path
                  id="Path-10"
                  data-name="Path"
                  d="M725.942,361.706s3.229-4.475,7-4,15.529,1.051,16,2a28.082,28.082,0,0,0,3,5c.943.949,7.529,2.306,8,8s-17,41-17,41,2.471,8.1,2,10,2.471,7.627,2,10,7.771,16.494,4,35v30s11.771,51.2,8,55-15.643,1.424-18,0-13-73-13-73l-4-24-1,53s1.3,44.576-2,46-16.057,1.847-17-1c-.735-2.22-4.45-61.1-6-87a99.833,99.833,0,0,1,2-27c1.962-8.958,4.755-18.729,8-23,6.128-8.067,10-34,10-34l-8-15s5.172-5,8-5S725.942,361.706,725.942,361.706Z"
                  transform="translate(-470.897 -262.239)"
                  fill="#2b44ff"
                />
                <path
                  id="Path-11"
                  data-name="Path"
                  d="M814.687,383.4l2,2s1.414,30.1,0,32-11.259,1.672-12,0S814.687,383.4,814.687,383.4Z"
                  transform="translate(-527.642 -275.935)"
                  fill="#fbfbfb"
                />
                <path
                  id="Path-12"
                  data-name="Path"
                  d="M688.131,439.239c1.38,9.636,2.055,18.24-5,26a135.046,135.046,0,0,1-24,21c-.865,2.307-13.354,18.759-14,12s3.763-12.284,10-18,15.076-18.2,20-25,3.171-10.316,3-16S686.195,439.307,688.131,439.239Z"
                  transform="translate(-443.086 -303.772)"
                  fill="#b28b67"
                />
                <path
                  id="Path-13"
                  data-name="Path"
                  d="M716.7,781.441s.414,5.577-1,7-5.471,2.78-5,8,3,6,3,6v-2l2,1v1h13s.471-5.627,0-8-.586-13.474-2-13-5.057,1.1-6,3S716.224,785.616,716.7,781.441Z"
                  transform="translate(-477.651 -484.974)"
                  fill="#3d3d3d"
                />
                <path
                  id="Path-14"
                  data-name="Path"
                  d="M814.042,781.441s-.414,5.577,1,7,5.472,2.78,5,8-3,6-3,6v-2l-2,1v1h-13s-.471-5.627,0-8,.586-13.474,2-13,5.057,1.1,6,3S814.513,785.616,814.042,781.441Z"
                  transform="translate(-525.997 -484.974)"
                  fill="#3d3d3d"
                />
                <path
                  id="Path-15"
                  data-name="Path"
                  d="M723.885,378.775l-7,1s-.114,10.729-2,15-5.414,14.526-4,15,15.057,6.8,16,3S730.485,378.775,723.885,378.775Z"
                  transform="translate(-477.84 -273.308)"
                  fill="#fbfbfb"
                />
                <circle
                  id="Path-16"
                  data-name="Path"
                  cx="17.5"
                  cy="17.5"
                  r="17.5"
                  transform="translate(269.045 31.467)"
                  fill="#3c3c3c"
                />
                <path
                  id="Path-17"
                  data-name="Path"
                  d="M825.3,272.38a17.667,17.667,0,0,1-16,2,16.556,16.556,0,0,1-11-11c.816,6.53,5.844,11.782,12,14s12.253.526,17-4,6.866-10.692,5-17A16.919,16.919,0,0,1,825.3,272.38Z"
                  transform="translate(-524.255 -208.914)"
                  fill="#3c3c3c"
                />
                <ellipse
                  id="Path-18"
                  data-name="Path"
                  cx="13"
                  cy="12.5"
                  rx="13"
                  ry="12.5"
                  transform="translate(259.045 62.467)"
                  fill="#3c3c3c"
                />
                <ellipse
                  id="Path-19"
                  data-name="Path"
                  cx="11.5"
                  cy="8.5"
                  rx="11.5"
                  ry="8.5"
                  transform="translate(250.045 61.467)"
                  fill="#3c3c3c"
                />
                <ellipse
                  id="Path-20"
                  data-name="Path"
                  cx="2"
                  cy="3.5"
                  rx="2"
                  ry="3.5"
                  transform="translate(256.045 75.467)"
                  fill="#737373"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
