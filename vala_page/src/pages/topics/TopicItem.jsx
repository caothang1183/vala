import "./TopicItem.scss";

const TopicItem = ({ topic }) => {
  return (
    <div className="TopicItem">
      <img
        src={topic === null ? "https://via.placeholder.com/140x100" : topic.url}
        alt=""
      />
      <div className="topic-content">
        <h3>{topic === null ? "Loading" : topic.name}</h3>

        <div className="topic-description">
          {topic === null ? "Loading" : topic.description}
        </div>
      </div>
    </div>
  );
};

export default TopicItem;
