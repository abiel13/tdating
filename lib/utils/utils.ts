import { type ClassValue, clsx } from "clsx";
import { resolve } from "path";
import { twMerge } from "tailwind-merge";

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function imageToBase64(file: File, callback: Function) {
  const reader = new FileReader();

  reader.onloadend = function () {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
}

interface gLT {
  longitude: number;
  latitude: number;
}

export async function getLocation(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage = "";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              errorMessage =
                "You denied the request for Geolocation. Please enable it to use location-based features.";
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              errorMessage =
                "Location information is unavailable. Please try again later.";
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              errorMessage =
                "The request to get your location timed out. Please try again.";
              break;
            default:
              console.log("An unknown error occurred.");
              errorMessage =
                "An unknown error occurred while fetching your location. Please try again.";
              break;
          }
          reject(errorMessage);
        }
      );
    } else {
      const errorMessage = "Geolocation is not supported by your browser.";
      console.log(errorMessage);
      reject(errorMessage);
    }
  });
}

export const validateAge = (dateOfBirth: unknown) => {
  if (!dateOfBirth) {
    console.log("date of birth is required");
    return "Date of birth is required.";
  }

  const today = new Date();
  const birthDate = new Date(dateOfBirth as Date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    console.log("use must be at least 18 years old");
    return "You must be at least 18 years old.";
  }

  return false;
};

export const calculateAge = (birthdate: any): string => {
  const today = new Date();
  const date = new Date(birthdate);

  let age = today.getFullYear() - date?.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age.toLocaleString();
};
