import clipboardy from 'clipboardy';
import fetch from 'node-fetch';
import FormData from 'form-data';
// create an function that pooling the cd ~/images for the most recent image
// and then uploads it to imgur
const formData = new FormData();

const waitForNewImage = async(oldImage ) => {

  const mostRecentImage = (await $`cd ~/images && ls -t | head -1`).toString();
  return mostRecentImage;
}

async function uploadToImgur() {
  try {
    const mostRecentImage = (await $`cd ~/images && ls -t | head -1`).toString();
    const newImage = await waitForNewImage(mostRecentImage);

    const image = fs.readFileSync('/Users/eduardomaciel/images/'+ newImage.replace('\n',''));
    formData.append('image', Buffer.from(image,'base64'), { filename: 'my-image.png' });
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': 'Client-ID ',
      },
      body: formData
    });
    const data = await response.json();
    console.log(data);
    console.log(`Image uploaded to Imgur: ${data.data.link}`);
    
  } catch (error) {
    console.error(`Error uploading image to Imgur: ${error}`);
  }
}


await uploadToImgur();
