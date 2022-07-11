

   export const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  export const  formatNumber = ( number ) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS"
    }).format(number);
  }