import React from "react";
import "./Banner.scss";

const Banner = () => (
	<div className="Banner container">
		<div className="">
			<div className="title">
				<p data-aos="fade-up" data-aos-delay="100">
					Stock is Digital Market Agency
				</p>
				<h1 data-aos="fade-up" data-aos-delay="300">
					We Create Impact through Digital <span>Market</span>
				</h1>
				<button
					data-aos="fade-up"
					data-aos-delay="500"
					type="button"
					className="btn btn-primary"
					data-toggle="button"
				>
					Let's talk
				</button>
			</div>
		</div>
	</div>
);

export default Banner;
