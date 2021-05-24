export const imageConverter = (image) => {
  if (image === null) return null;
  let linkImage = image.split(`"`);
  let url = linkImage[1].split(`"`)[0];
  return url;
};
