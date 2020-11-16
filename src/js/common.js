
export const splitUrls = obj => {
  const thumb = obj.thumb ? obj.thumb + " " + "200w" + ", " : "";
  const small = obj.small ? obj.small + " " + "400w" + ", " : "";
  const regular = obj.regular ? obj.regular + " " + "1080w" + ", " : "";
  return thumb + small + regular;
};

export const extractData = ary => {
  let res = ary.map(item => {
    let result = {};
    result.id = item.id;
    result.urls = splitUrls(item.urls);
    result.tags = item.tags;
    result.description =item.alt_description || item.description || '';
    result.modal ={
      name:item.user.name ||item.first_name+' '+item.last_name ||'',
      twitter:item.user.twitter_username ||''
    }
    return result;
  });
  return res;
};

export const createFormStyleLocationRelative=(str, baseClass)=>{
  
  switch(str) {
    case '/':
      return `${baseClass} form--search`;
      
    case '/images':
      return `${baseClass} form--images`;
      
    default:
      return `${baseClass} form--search`;
  } 
}


export const getTags = ary => [
  ...new Set(
    ary
      .map(item => item.tags)
      .flat()
      .map(item => item.title)
  ),
];

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const getOptions = ary =>
  ary.map(item => {
    return { value: item, label: capitalizeFirstLetter(item) };
  });

