

const onFileChanged = (event, backgroundId) => {

  const background = document.getElementById(backgroundId);

  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      background.style.backgroundImage = 'url(' + e.target.result + ')';
    }
  }
}

const onUploadClick = (inputId) => {
  const input = document.getElementById(inputId);
  input.click();
}

const onCancelClick = (inputId, backgroundId) => {
  const input = document.getElementById(inputId);
  input.value = null;
  const background = document.getElementById(backgroundId);
  background.style.backgroundImage = null;
}
