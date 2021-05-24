import React from "react";
import "./News.scss";
import NewsItem from "./NewsItem";

const News = () => (
	<div className="News">
		<div className="container">
			<div className="row ">
				<h3 data-aos="fade-up">News</h3>
				<h4 data-aos="fade-up">Our Latest Articles</h4>
				<NewsItem
					url={"https://i.imgur.com/h5Jecaa.png"}
					tags={["Strategy"]}
					title={"Những điều cần biết về Market Strategic Development"}
					description={
						"Phát triển thị trường là tổng hợp các cách thức, phương hướng, biện pháp mà doanh nghiệp áp dụng để đưa khối lượng sản phẩm tiêu thụ trên thị trường đạt mức tối đa. Từ đó góp phần giúp doanh nghiệp mở rộng thị phần và phát triển hoạt động kinh doanh ngày một tốt hơn."
					}
				/>
				<NewsItem
					url={
						"https://image.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg"
					}
					tags={["Booking"]}
					title={"PR Booking là gì?"}
					description={
						"PR Booking là một thuật ngữ quen thuộc được sử dụng và xuất hiện nhiều trong lĩnh vực marketing. Nếu như bạn đang thắc mắc không biết PR booking là gì thì hãy cùng KAGENCY tìm hiểu về từ khóa này nhé."
					}
				/>
				<NewsItem
					url={
						"https://www.disruptivestatic.com/wp-content/uploads/2018/07/b2b-marketing-blog.jpg"
					}
					tags={["Influencer Marketing"]}
					title={"Influencer Marketing là gì?"}
					description={
						"Influencer “người có tầm ảnh hưởng” – họ là những người nổi tiếng, tạo ra xu thế, sức ảnh hưởng lớn đến với cộng đồng trực tuyến."
					}
				/>
				<div className="btn-more">
					<button data-aos="fade-up" className="InfoButton more-post">
						View More Post
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default News;
