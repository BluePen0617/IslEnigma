import React, { Component } from "react";
import Button from "../../components/common/Button";

function ShopMore({ shop_more }) {
	if (shop_more) {
		return (
			<a href={shop_more}>
				<Button btnContent={"查看更多 >"} />
			</a>
		);
	}else{
		return null
	}
}

export default ShopMore;
