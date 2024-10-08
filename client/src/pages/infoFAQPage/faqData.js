// faqData.js
export const faqData = {
  初始: [
    { text: "遊園資訊", nextState: "遊園資訊", icon: "park-info.png" },
    { text: "設施與活動", nextState: "設施與活動", icon: "facility.png" },
    { text: "住宿選項", nextState: "住宿選項", icon: "booking-info.png" },
    {
      text: "餐飲與購物",
      nextState: "餐飲與購物",
      icon: "restaurant-info.png",
    },
  ],
  遊園資訊: [
    { text: "入園須知", nextState: "入園須知" },
    { text: "園區禁止攜帶物品", nextState: "園區禁止攜帶物品" },
    { text: "營業時間與票務", nextState: "營業時間與票務" },
    { text: "交通與園內服務", nextState: "交通與園內服務" },
  ],
  入園須知: [
    {
      text: "入園年齡限制",
      answer:
        "IslEnigma遊樂園限制18歲以上成年人入園。我們的設施和體驗都是為成年人設計的,不適合未成年人。",
    },
    { text: "返回上一級", nextState: "遊園資訊" },
  ],
  園區禁止攜帶物品: [
    {
      text: "禁止物品清單",
      answer:
        "為確保所有遊客的安全和舒適體驗，請勿攜帶下列品項入園：外部購買的食品和飲料（包括酒精飲料）、寵物（票口有寵物寄放區）、任何運動器材或代步工具、危險物品如刀具槍械等武器、法定公告管制性藥物或毒品、大型攝影器材（如三腳架）或專業攝影設備（除非事先獲得許可）、無人機或遙控飛行器、可能造成他人不適或妨礙他人遊玩的物品。園區保留對可疑物品進行檢查的權利。",
    },
    { text: "返回上一級", nextState: "遊園資訊" },
  ],
  營業時間與票務: [
    {
      text: "營業時間",
      answer:
        "遊樂園全年無休，園區營業時間：09:00~20:00，設施開放時間：09:00~19:30，營地營業時間：08:00~24:00。",
    },
    {
      text: "門票價格",
      answer: "成人單日門票價格為新台幣2,000元。詳細價格請查看官網或聯繫客服。",
    },
    {
      text: "VIP票說明",
      answer:
        "VIP票通常包含優先入園、特定設施的快速通道等特權。詳細差異請查看官網或諮詢客服。註:購票不包含住宿，請遊客分開購票。",
    },
    {
      text: "退票政策",
      answer:
        "其他購票平台所購買的相關套票須自行與購票平台退票，本園區無提供退票服務。",
    },
    {
      text: "門票兌換券使用",
      answer:
        "門票兌換券上有相關文字說明。如有任何疑問，可將相關資料寄到本公司客服信箱進行確認。",
    },
    { text: "返回上一級", nextState: "遊園資訊" },
  ],
  交通與園內服務: [
    {
      text: "如何前往",
      answer:
        "遊客可以搭乘專屬接駁船(接Boat)前往島嶼。我們在主要港口都設有接駁站（購票即得）。",
    },
    { text: "園內交通", answer: "園內遊園車每小時一班。" },
    {
      text: "儲物櫃服務",
      answer:
        "園內各主要區域都設有自助儲物櫃，提供小型（30cm x 30cm x 50cm，每4小時100元）、中型（45cm x 45cm x 70cm，每4小時150元）和大型（60cm x 60cm x 90cm，每4小時200元）三種尺寸。",
    },
    {
      text: "輪椅租借",
      answer: "提供免費輪椅租借服務，需執押證件。（不提供預約服務）",
    },
    { text: "返回上一級", nextState: "遊園資訊" },
  ],
  設施與活動: [
    { text: "主要遊樂設施", nextState: "主要遊樂設施" },
    { text: "表演與活動", nextState: "表演與活動" },
    { text: "其他服務", nextState: "其他服務" },
  ],
  主要遊樂設施: [
    {
      text: "園區主題區",
      answer:
        "園內分為三大主題區: 璀璨綠洲(Sparkling Oasis)、嗨游洋外(Ocean High)和失落小島(Lostland)。每個區域都有獨特的設施和體驗。",
    },
    {
      text: "璀璨綠洲",
      answer:
        "包括幻光森林(Illuminated Forest)、夢幻瀑布(Dreamfall)、閃耀花園(Radiant Garden)和光影迷宮(Gleaming Maze)。這裡充滿了奇幻的燈光效果和美麗的自然景觀。",
    },
    {
      text: "嗨游洋外",
      answer:
        "主要設施有海洋探險4D劇場(Ocean Expedition)、珊瑚礁之旅(Coral Reef Adventure)、海底隧道(Underwater Tunnel)和彩虹飛龍高空跳傘(Rainbow Dragon)。",
    },
    {
      text: "失落小島",
      answer:
        "擁有摩天輪(Mystic Ferris Wheel)、旋轉木馬(Enchanted Carousel)、激流勇進(Rapid River Ride)、飛行塔(Sky Soar Tower)和雲霄飛車(Roller Coaster)等刺激設施。",
    },
    { text: "返回上一級", nextState: "設施與活動" },
  ],
  表演與活動: [
    {
      text: "日常表演",
      answer:
        "每日在不同區域有多場表演,包括幻光森林導覽(每日4場)、彩虹飛龍跳傘體驗(每日多場)等。",
    },
    {
      text: "夜間活動",
      answer:
        "每晚在幻光森林有大型光影秀,海灘區有煙火表演。星空餐廳提供星際美食之旅,迷幻酒吧有特色調酒品嘗活動。",
    },
    {
      text: "VIP專屬活動",
      answer:
        "為VIP客戶提供深海生物觀察、深海潛水艇之旅和午夜水舞秀等尊榮體驗。",
    },
    {
      text: "特殊活動",
      answer:
        "每月第一個週末有主題派對,請關注官網公告。建議參考園區提供的節目時刻表來安排您的行程。",
    },
    {
      text: "天氣影響",
      answer:
        "大部分室內設施和劇場在下雨天仍然開放。但為了遊客安全,部分戶外設施可能會暫時關閉。請關注園內即時公告。",
    },
    { text: "返回上一級", nextState: "設施與活動" },
  ],
  其他服務: [
    {
      text: "VIP服務",
      answer:
        "VIP客戶享有專屬快速通道、深海生物觀察、深海潛水艇之旅和午夜水舞秀等特殊體驗。詳情請諮詢客服。",
    },
    {
      text: "醫療服務",
      answer: "園內設有醫療站,並有專業醫護人員駐守,以應對緊急情況。",
    },
    {
      text: "失物招領",
      answer:
        "請至服務中心'失物招領區'確認,或電客服中心提供當天入園日期以及遺失物特徵,方便協尋。如有尋獲並將遺失物寄回,運費由遊客支付,本園區不支付相關費用。",
    },
    {
      text: "網路服務",
      answer: "園內全區域提供免費Wi-Fi服務,遊客可在遊客中心領取登入密碼。",
    },
    {
      text: "拍照服務",
      answer:
        "園內設有多處特色拍照點和景觀台,如摩天輪頂端、彩虹飛龍跳台等,都是絕佳的拍照地點。",
    },
    { text: "返回上一級", nextState: "設施與活動" },
  ],
  住宿選項: [
    { text: "露營區須知", nextState: "露營區須知" },
    { text: "房型與價格", nextState: "房型與價格" },
    { text: "預訂與入住", nextState: "預訂與入住" },
    { text: "特殊服務", nextState: "特殊服務" },
  ],
  露營區須知: [
    {
      text: "自備物品",
      answer:
        "園區的淋浴間備有洗髮精、沐浴乳，另也備有吹風機。寢具已為您準備好。您只需要帶個人盥洗用品、換洗衣物和證件即可。",
    },
    {
      text: "露營區位置",
      answer:
        "豪華露營區位於島嶼靠近港口區域。這個位置既方便往返碼頭，又能欣賞到美麗的海景。從露營區到園區主要設施區域有定時接駁車服務。",
    },
    { text: "返回上一級", nextState: "住宿選項" },
  ],
  房型與價格: [
    {
      text: "房型介紹",
      answer:
        "我們有四種房型，價格如下：草原步調(簡約帳篷)：NT$12000/晚，沉靜海洋(豪華帳棚)：NT$15000/晚，島嶼蹤跡(高級帳篷)：NT$18000/晚，夢幻星空(圓球帳篷)：NT$20000/晚。所有價格均包含遊樂園門票和早餐。",
    },
    { text: "返回上一級", nextState: "住宿選項" },
  ],
  預訂與入住: [
    {
      text: "預訂流程",
      answer:
        "可通過官網、電話或電子郵件預訂。預訂時需支付一晚房費作為訂金，剩餘費用在入住時支付。",
    },
    {
      text: "入住與退房時間",
      answer:
        "標準入住時間為下午3點，退房時間為上午11點。如需提早入住或延後退房，請提前與前台聯繫，視當日房況而定，可能會收取額外費用。",
    },
    {
      text: "取消政策",
      answer:
        "入住日7天前取消可全額退款，3-6天前取消收取一晚房費，3天內取消不予退款。",
    },
    { text: "返回上一級", nextState: "住宿選項" },
  ],
  特殊服務: [
    {
      text: "夜間活動",
      answer:
        "住宿guests可以在晚上使用園區的部分設施和區域。我們提供夜間接駁車服務到指定的開放區域，如迷幻酒吧和特定的海灘區。但出於安全考慮，部分區域在夜間可能會關閉。",
    },
    {
      text: "特色服務",
      answer:
        "我們提供多種特色服務，如星空觀測、私人調酒課程、海灘瑜伽等。每種房型還有其獨特的體驗，如星空帳篷的專屬星空導覽服務。",
    },
    {
      text: "額外服務",
      answer:
        "提供24小時客房服務、洗衣服務、行李寄存、接送服務等。詳情請諮詢前台。",
    },
    { text: "返回上一級", nextState: "住宿選項" },
  ],
  餐飲與購物: [
    { text: "餐廳介紹", nextState: "餐廳介紹" },
    { text: "特色美食", nextState: "特色美食" },
    { text: "購物指南", nextState: "購物指南" },
  ],
  餐廳介紹: [
    {
      text: "星空餐廳",
      answer:
        "位於璀璨綠洲區的最高處,是一家旋轉餐廳,提供360度全景視野和國際美食。內部裝飾有星空天花板,營造夢幻氛圍。",
    },
    {
      text: "海洋美饌",
      answer:
        "位於嗨游洋外區,環繞大型水族箱的特色餐廳,專門提供海鮮料理,結合海洋主題設計。",
    },
    {
      text: "夢境咖啡廳",
      answer: "位於璀璨綠洲區,提供手工咖啡和甜點,環境舒適,充滿夢幻元素。",
    },
    {
      text: "光影咖啡廳",
      answer: "位於失落小島區,利用燈光和陰影創造獨特氛圍的咖啡廳。",
    },
    {
      text: "迷幻酒吧",
      answer: "位於園區中心,提供創意雞尾酒和精釀啤酒,氛圍迷幻。",
    },
    { text: "返回上一級", nextState: "餐飲與購物" },
  ],
  特色美食: [
    { text: "夢幻調酒", answer: "每家酒吧都有特色調酒，推薦幻光雞尾酒系列。" },
    {
      text: "主題甜點",
      answer: "每個主題區都有獨特的造型甜點，是打卡拍照的最佳選擇。",
    },
    {
      text: "創意料理",
      answer: "融合多國風味的創新料理，如霧化海鮮湯、懸浮沙拉等。",
    },
    { text: "返回上一級", nextState: "餐飲與購物" },
  ],
  購物指南: [
    {
      text: "異域市集",
      answer: "位於出口區,是園內主要的購物區域,銷售遊樂園周邊商品和紀念品。",
    },
    {
      text: "主題紀念品",
      answer: "分佈在各主題區,銷售獨特的主題紀念品和限定商品。",
    },
    {
      text: "便利機台",
      answer: "位於住宿區和主要入口,提供日用品和簡單的食品飲料。",
    },
    { text: "返回上一級", nextState: "餐飲與購物" },
  ],
};

export const lastUpdated = {
  入園須知: "2024/08/03",
  園區禁止攜帶物品: "2024/08/04",
  營業時間與票務: "2024/08/05",
  交通與園內服務: "2024/08/06",
  主要遊樂設施: "2024/08/08",
  表演與活動: "2024/08/09",
  其他服務: "2024/08/10",
  露營區須知: "2024/08/12",
  房型與價格: "2024/08/13",
  預訂與入住: "2024/07/31",
  特殊服務: "2024/08/01",
  餐廳介紹: "2024/08/02",
  特色美食: "2024/08/03",
  購物指南: "2024/08/04",
};
