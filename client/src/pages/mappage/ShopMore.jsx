import React, { Component } from "react";
import Button from "../../components/common/Button";

function ShopMore({ shop_more }) {
	if (shop_more) {
		return (
			<a href={shop_more}>
				<Button btnContent={"詳情請參閱此處 >"} />
			</a>
		);
	}
}

export default ShopMore;
