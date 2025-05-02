// apps/cms/schemas/constants.ts

export const indianStates = [
    { title: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { title: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { title: 'Assam', value: 'Assam' },
    { title: 'Bihar', value: 'Bihar' },
    { title: 'Chhattisgarh', value: 'Chhattisgarh' },
    { title: 'Goa', value: 'Goa' },
    { title: 'Gujarat', value: 'Gujarat' },
    { title: 'Haryana', value: 'Haryana' },
    { title: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { title: 'Jharkhand', value: 'Jharkhand' },
    { title: 'Karnataka', value: 'Karnataka' },
    { title: 'Kerala', value: 'Kerala' },
    { title: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { title: 'Maharashtra', value: 'Maharashtra' },
    { title: 'Manipur', value: 'Manipur' },
    { title: 'Meghalaya', value: 'Meghalaya' },
    { title: 'Mizoram', value: 'Mizoram' },
    { title: 'Nagaland', value: 'Nagaland' },
    { title: 'Odisha', value: 'Odisha' },
    { title: 'Punjab', value: 'Punjab' },
    { title: 'Rajasthan', value: 'Rajasthan' },
    { title: 'Sikkim', value: 'Sikkim' },
    { title: 'Tamil Nadu', value: 'Tamil Nadu' },
    { title: 'Telangana', value: 'Telangana' },
    { title: 'Tripura', value: 'Tripura' },
    { title: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { title: 'Uttarakhand', value: 'Uttarakhand' },
    { title: 'West Bengal', value: 'West Bengal' },
    // Union Territories
    { title: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { title: 'Chandigarh', value: 'Chandigarh' },
    { title: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu' },
    { title: 'Delhi', value: 'Delhi' },
    { title: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
    { title: 'Ladakh', value: 'Ladakh' },
    { title: 'Lakshadweep', value: 'Lakshadweep' },
    { title: 'Puducherry', value: 'Puducherry' },
  ];
  
  export const daysOfWeek = [
    {title: 'Monday', value: 'Monday'},
    {title: 'Tuesday', value: 'Tuesday'},
    {title: 'Wednesday', value: 'Wednesday'},
    {title: 'Thursday', value: 'Thursday'},
    {title: 'Friday', value: 'Friday'},
    {title: 'Saturday', value: 'Saturday'},
    {title: 'Sunday', value: 'Sunday'},
  ]
  
  // Default Hours: Mon-Sat 9am-6pm (18:00), Sunday Closed
  export const defaultDealerHours = [
    {_key: 'mon', _type: 'dealerHours', day: 'Monday', open: '09:00', close: '18:00'},
    {_key: 'tue', _type: 'dealerHours', day: 'Tuesday', open: '09:00', close: '18:00'},
    {_key: 'wed', _type: 'dealerHours', day: 'Wednesday', open: '09:00', close: '18:00'},
    {_key: 'thu', _type: 'dealerHours', day: 'Thursday', open: '09:00', close: '18:00'},
    {_key: 'fri', _type: 'dealerHours', day: 'Friday', open: '09:00', close: '18:00'},
    {_key: 'sat', _type: 'dealerHours', day: 'Saturday', open: '09:00', close: '18:00'},
    {_key: 'sun', _type: 'dealerHours', day: 'Sunday', open: 'Closed', close: 'Closed'},
  ]