// apps/cms/src/utils/formatSlug.ts

const format = (val: string): string =>
    val
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()
  
  const formatSlug = (val: string): string => {
    if (!val) return '';
    return format(val);
  }
  
  export default formatSlug;