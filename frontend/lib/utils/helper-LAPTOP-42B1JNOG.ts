export const getYouTubeVideoId = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // Check if it's a youtu.be short link
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.substring(1); // Remove the leading "/"
    }

    // Check if it's a youtube.com link with "v" parameter
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    return null; // Invalid URL
  } catch (error) {
    return null; // Return null if URL is invalid
  }
};

export const getImagePathFromImageName = (filename:string)=>{
  // Remove extension
const nameOnly = filename.replace(/\.[^/.]+$/, "");

// Split by underscore
const [type,cameraName, dateStr, timeStr] = nameOnly.split("_");
let ctype="";
if(parseInt(type)==1)
  ctype='human_counting';
else if(parseInt(type)==2)
   ctype='height_calculation';
else if(parseInt(type)==5)
    ctype='pose_estimation';
else if(parseInt(type)==4)
   ctype='gait_analysis';
else
   ctype='human_recognition';

// Reformat date from DDMMYYYY to YYYY-MM-DD
const formattedDate = `${dateStr.slice(4)}-${dateStr.slice(2,4)}-${dateStr.slice(0,2)}`;

return {type : ctype,cameraName,formattedDate }
}

export const getFilenameAfterRemoveType = (filename: string)=>{
  // Split by underscore
  const cleanedFilename = filename.replace(/^\d+_/, "");
  return cleanedFilename;
}