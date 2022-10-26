export const headings = [
  { name: "Outlet Name" },
  { name: "Hotel Name" },
  { name: "Actions" },
];

export const searchParams = {
  outletName: "",
  hotel: "",
  sortBy: "",
  orderBy: "",
  limit: 10,
  skip: 0,
};

export const imageTemplate = (order) => {
  return {
    orderNumber: order || 0,
    imageFile: "",
    remarks: "",
  };
};

export const MakeFormData = (
  elem,
  navigationImages,
  outletImages,
  groomingImages
) => {
  console.log("selectedOutlet", elem);
  let formData = new FormData();
  formData.append("hotel", elem?.hotel);
  formData.append("outletName", elem?.outletName);
  formData.append("customerDetails", elem?.customerDetails);
  formData.append("billingAddress", elem?.billingAddress);
  formData.append("attendanceEmail", elem?.attendanceEmail);
  formData.append("invoiceEmail", elem?.invoiceEmail);
  formData.append("payment", elem?.payment);
  formData.append("jobRemarks", elem?.jobRemarks);
  formData.append("youtubeLink", elem?.youtubeLink);
  formData.append("outletAdminNo", elem?.outletAdminNo);
  formData.append("sunday", elem?.sunday);
  formData.append("monday", elem?.monday);
  formData.append("tuesday", elem?.tuesday);
  formData.append("wednesday", elem?.wednesday);
  formData.append("thursday", elem?.thursday);
  formData.append("friday", elem?.friday);
  formData.append("saturday", elem?.saturday);
  formData.append("startingSerialNumber", elem?.startingSerialNumber);
  formData.append("extraInvoiceColumn", elem?.extraInvoiceColumn);
  formData.append("outletId", elem?.outletId || "");
  navigationImages?.forEach((file) => {
    formData.append("howToImages", file);
  });
  outletImages?.forEach((file) => {
    formData.append("outletImages", file);
  });
  groomingImages?.forEach((file) => {
    formData.append("groomingImages", file);
  });

  return formData;
};
