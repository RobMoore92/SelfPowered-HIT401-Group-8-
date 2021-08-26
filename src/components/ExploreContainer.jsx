

const ExploreContainer = () => {
  return (
   <div>
      <Card client_name={" SmitJohnh"}/>
    <Card/>
    <Card/>
   </div>
  );
};

const Card = ({client_name}) => {
  return(
    <div className="h-32 w-1/2 m-16 rounded-md shadow-lg bg-gray-200">
    <p className="text-3xl text-gray-700 p-4">{client_name}</p>
  </div>
  )
}

export default ExploreContainer;
