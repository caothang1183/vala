import TopicItem from "./TopicItem";

const TopicList = ({ brandingList = {} }) => {
  var evenBranding = [];
  // brandingList.map((item, index) => {
  //   if ((index + 1) % 2 === 0) {
  //     return oddBranding.push(item);
  //   } else {
  //     return evenBranding.push(item);
  //   }
  // });
  return (
    <div className="row">
      <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <TopicItem key={"0"} topic={brandingList} />
      </div>

      <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {evenBranding.map((item, index) => (
          <TopicItem key={index} topic={item} />
        ))}
      </div>
    </div>
  );
};

export default TopicList;
