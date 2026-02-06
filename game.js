/**
 * 墨韵成语 - Chinese Idiom Chain Game
 * A Chinese ink wash style idiom chain game
 */

(function() {
    'use strict';

    // ===========================================
    // IDIOM DATABASE (100+ idioms with varying difficulty)
    // ===========================================
    const IDIOM_DATABASE = [
        // Common (easy) idioms - 36 idioms
        { idiom: "一心一意", pinyin: "yi xin yi yi", first_char: "一", last_char: "意", first_pinyin: "yi", last_pinyin: "yi", meaning: "形容做事专心，集中精力", difficulty: "common" },
        { idiom: "意气风发", pinyin: "yi qi feng fa", first_char: "意", last_char: "发", first_pinyin: "yi", last_pinyin: "fa", meaning: "形容精神振奋，气概豪迈", difficulty: "common" },
        { idiom: "发愤图强", pinyin: "fa fen tu qiang", first_char: "发", last_char: "强", first_pinyin: "fa", last_pinyin: "qiang", meaning: "下定决心，努力谋求强盛", difficulty: "common" },
        { idiom: "强词夺理", pinyin: "qiang ci duo li", first_char: "强", last_char: "理", first_pinyin: "qiang", last_pinyin: "li", meaning: "没有道理硬说有理", difficulty: "common" },
        { idiom: "理直气壮", pinyin: "li zhi qi zhuang", first_char: "理", last_char: "壮", first_pinyin: "li", last_pinyin: "zhuang", meaning: "理由充分，说话有气势", difficulty: "common" },
        { idiom: "壮志凌云", pinyin: "zhuang zhi ling yun", first_char: "壮", last_char: "云", first_pinyin: "zhuang", last_pinyin: "yun", meaning: "形容志向远大", difficulty: "common" },
        { idiom: "云开雾散", pinyin: "yun kai wu san", first_char: "云", last_char: "散", first_pinyin: "yun", last_pinyin: "san", meaning: "比喻疑虑消除，真相大白", difficulty: "common" },
        { idiom: "马到成功", pinyin: "ma dao cheng gong", first_char: "马", last_char: "功", first_pinyin: "ma", last_pinyin: "gong", meaning: "形容事情顺利，一开始就取得成功", difficulty: "common" },
        { idiom: "功成名就", pinyin: "gong cheng ming jiu", first_char: "功", last_char: "就", first_pinyin: "gong", last_pinyin: "jiu", meaning: "功业建立了，名声也有了", difficulty: "common" },
        { idiom: "就事论事", pinyin: "jiu shi lun shi", first_char: "就", last_char: "事", first_pinyin: "jiu", last_pinyin: "shi", meaning: "按照事情本身来评论", difficulty: "common" },
        { idiom: "事半功倍", pinyin: "shi ban gong bei", first_char: "事", last_char: "倍", first_pinyin: "shi", last_pinyin: "bei", meaning: "用一半的力气达到两倍的效果", difficulty: "common" },
        { idiom: "心想事成", pinyin: "xin xiang shi cheng", first_char: "心", last_char: "成", first_pinyin: "xin", last_pinyin: "cheng", meaning: "心里想的都能实现", difficulty: "common" },
        { idiom: "成人之美", pinyin: "cheng ren zhi mei", first_char: "成", last_char: "美", first_pinyin: "cheng", last_pinyin: "mei", meaning: "帮助他人成全好事", difficulty: "common" },
        { idiom: "美不胜收", pinyin: "mei bu sheng shou", first_char: "美", last_char: "收", first_pinyin: "mei", last_pinyin: "shou", meaning: "美好的东西太多，看不过来", difficulty: "common" },
        { idiom: "收获满满", pinyin: "shou huo man man", first_char: "收", last_char: "满", first_pinyin: "shou", last_pinyin: "man", meaning: "取得了很多成果", difficulty: "common" },
        { idiom: "满面春风", pinyin: "man mian chun feng", first_char: "满", last_char: "风", first_pinyin: "man", last_pinyin: "feng", meaning: "形容人心情愉快，满脸笑容", difficulty: "common" },
        { idiom: "风和日丽", pinyin: "feng he ri li", first_char: "风", last_char: "丽", first_pinyin: "feng", last_pinyin: "li", meaning: "天气晴朗，微风和煦", difficulty: "common" },
        { idiom: "丽景如画", pinyin: "li jing ru hua", first_char: "丽", last_char: "画", first_pinyin: "li", last_pinyin: "hua", meaning: "美丽的景色如同画中一般", difficulty: "common" },
        { idiom: "画龙点睛", pinyin: "hua long dian jing", first_char: "画", last_char: "睛", first_pinyin: "hua", last_pinyin: "jing", meaning: "比喻写文章在关键处加上精辟的话", difficulty: "common" },
        { idiom: "精益求精", pinyin: "jing yi qiu jing", first_char: "精", last_char: "精", first_pinyin: "jing", last_pinyin: "jing", meaning: "已经很好了还要求更好", difficulty: "common" },
        { idiom: "日新月异", pinyin: "ri xin yue yi", first_char: "日", last_char: "异", first_pinyin: "ri", last_pinyin: "yi", meaning: "每天都在更新变化，形容进步快", difficulty: "common" },
        { idiom: "异想天开", pinyin: "yi xiang tian kai", first_char: "异", last_char: "开", first_pinyin: "yi", last_pinyin: "kai", meaning: "形容想法离奇，不切实际", difficulty: "common" },
        { idiom: "开门见山", pinyin: "kai men jian shan", first_char: "开", last_char: "山", first_pinyin: "kai", last_pinyin: "shan", meaning: "说话写文章直截了当", difficulty: "common" },
        { idiom: "山清水秀", pinyin: "shan qing shui xiu", first_char: "山", last_char: "秀", first_pinyin: "shan", last_pinyin: "xiu", meaning: "形容风景优美", difficulty: "common" },
        { idiom: "秀外慧中", pinyin: "xiu wai hui zhong", first_char: "秀", last_char: "中", first_pinyin: "xiu", last_pinyin: "zhong", meaning: "容貌清秀，内心聪慧", difficulty: "common" },
        { idiom: "中流砥柱", pinyin: "zhong liu di zhu", first_char: "中", last_char: "柱", first_pinyin: "zhong", last_pinyin: "zhu", meaning: "比喻坚强独立的人", difficulty: "common" },
        { idiom: "手舞足蹈", pinyin: "shou wu zu dao", first_char: "手", last_char: "蹈", first_pinyin: "shou", last_pinyin: "dao", meaning: "形容高兴到了极点", difficulty: "common" },
        { idiom: "道听途说", pinyin: "dao ting tu shuo", first_char: "道", last_char: "说", first_pinyin: "dao", last_pinyin: "shuo", meaning: "从道路上听来的传闻", difficulty: "common" },
        { idiom: "说一不二", pinyin: "shuo yi bu er", first_char: "说", last_char: "二", first_pinyin: "shuo", last_pinyin: "er", meaning: "说到做到，不改变", difficulty: "common" },
        { idiom: "二话不说", pinyin: "er hua bu shuo", first_char: "二", last_char: "说", first_pinyin: "er", last_pinyin: "shuo", meaning: "不多说话，立即行动", difficulty: "common" },
        { idiom: "天长地久", pinyin: "tian chang di jiu", first_char: "天", last_char: "久", first_pinyin: "tian", last_pinyin: "jiu", meaning: "形容时间悠久", difficulty: "common" },
        { idiom: "久而久之", pinyin: "jiu er jiu zhi", first_char: "久", last_char: "之", first_pinyin: "jiu", last_pinyin: "zhi", meaning: "经过很长时间", difficulty: "common" },
        { idiom: "之乎者也", pinyin: "zhi hu zhe ye", first_char: "之", last_char: "也", first_pinyin: "zhi", last_pinyin: "ye", meaning: "讽刺人说话喜欢咬文嚼字", difficulty: "common" },
        { idiom: "也许如此", pinyin: "ye xu ru ci", first_char: "也", last_char: "此", first_pinyin: "ye", last_pinyin: "ci", meaning: "大概是这样吧", difficulty: "common" },
        { idiom: "欢天喜地", pinyin: "huan tian xi di", first_char: "欢", last_char: "地", first_pinyin: "huan", last_pinyin: "di", meaning: "形容非常高兴", difficulty: "common" },
        { idiom: "地大物博", pinyin: "di da wu bo", first_char: "地", last_char: "博", first_pinyin: "di", last_pinyin: "bo", meaning: "领土辽阔，资源丰富", difficulty: "common" },

        // Intermediate idioms - 37 idioms
        { idiom: "博古通今", pinyin: "bo gu tong jin", first_char: "博", last_char: "今", first_pinyin: "bo", last_pinyin: "jin", meaning: "对古今知识都很了解", difficulty: "intermediate" },
        { idiom: "今非昔比", pinyin: "jin fei xi bi", first_char: "今", last_char: "比", first_pinyin: "jin", last_pinyin: "bi", meaning: "现在和过去大不相同", difficulty: "intermediate" },
        { idiom: "比翼双飞", pinyin: "bi yi shuang fei", first_char: "比", last_char: "飞", first_pinyin: "bi", last_pinyin: "fei", meaning: "形容夫妻恩爱", difficulty: "intermediate" },
        { idiom: "飞黄腾达", pinyin: "fei huang teng da", first_char: "飞", last_char: "达", first_pinyin: "fei", last_pinyin: "da", meaning: "比喻官职地位上升很快", difficulty: "intermediate" },
        { idiom: "达官贵人", pinyin: "da guan gui ren", first_char: "达", last_char: "人", first_pinyin: "da", last_pinyin: "ren", meaning: "地位高贵的人", difficulty: "intermediate" },
        { idiom: "人山人海", pinyin: "ren shan ren hai", first_char: "人", last_char: "海", first_pinyin: "ren", last_pinyin: "hai", meaning: "形容人多得很", difficulty: "intermediate" },
        { idiom: "海阔天空", pinyin: "hai kuo tian kong", first_char: "海", last_char: "空", first_pinyin: "hai", last_pinyin: "kong", meaning: "形容大自然的广阔或心胸开阔", difficulty: "intermediate" },
        { idiom: "空前绝后", pinyin: "kong qian jue hou", first_char: "空", last_char: "后", first_pinyin: "kong", last_pinyin: "hou", meaning: "以前没有过，以后也不会有", difficulty: "intermediate" },
        { idiom: "后来居上", pinyin: "hou lai ju shang", first_char: "后", last_char: "上", first_pinyin: "hou", last_pinyin: "shang", meaning: "后来的超过先前的", difficulty: "intermediate" },
        { idiom: "上行下效", pinyin: "shang xing xia xiao", first_char: "上", last_char: "效", first_pinyin: "shang", last_pinyin: "xiao", meaning: "上面的人怎么做，下面的人就跟着学", difficulty: "intermediate" },
        { idiom: "效犬马力", pinyin: "xiao quan ma li", first_char: "效", last_char: "力", first_pinyin: "xiao", last_pinyin: "li", meaning: "愿意像犬马一样效劳", difficulty: "intermediate" },
        { idiom: "力挽狂澜", pinyin: "li wan kuang lan", first_char: "力", last_char: "澜", first_pinyin: "li", last_pinyin: "lan", meaning: "比喻尽力挽回危险的局势", difficulty: "intermediate" },
        { idiom: "澜翻絮拥", pinyin: "lan fan xu yong", first_char: "澜", last_char: "拥", first_pinyin: "lan", last_pinyin: "yong", meaning: "形容文笔汪洋恣肆", difficulty: "intermediate" },
        { idiom: "雪中送炭", pinyin: "xue zhong song tan", first_char: "雪", last_char: "炭", first_pinyin: "xue", last_pinyin: "tan", meaning: "在别人困难时给予帮助", difficulty: "intermediate" },
        { idiom: "炭火纯青", pinyin: "tan huo chun qing", first_char: "炭", last_char: "青", first_pinyin: "tan", last_pinyin: "qing", meaning: "比喻功夫达到纯熟的境界", difficulty: "intermediate" },
        { idiom: "青出于蓝", pinyin: "qing chu yu lan", first_char: "青", last_char: "蓝", first_pinyin: "qing", last_pinyin: "lan", meaning: "学生超过老师", difficulty: "intermediate" },
        { idiom: "蓝田生玉", pinyin: "lan tian sheng yu", first_char: "蓝", last_char: "玉", first_pinyin: "lan", last_pinyin: "yu", meaning: "比喻名门出俊才", difficulty: "intermediate" },
        { idiom: "玉树临风", pinyin: "yu shu lin feng", first_char: "玉", last_char: "风", first_pinyin: "yu", last_pinyin: "feng", meaning: "形容人风度潇洒", difficulty: "intermediate" },
        { idiom: "风流倜傥", pinyin: "feng liu ti tang", first_char: "风", last_char: "傥", first_pinyin: "feng", last_pinyin: "tang", meaning: "形容人洒脱不羁", difficulty: "intermediate" },
        { idiom: "锦上添花", pinyin: "jin shang tian hua", first_char: "锦", last_char: "花", first_pinyin: "jin", last_pinyin: "hua", meaning: "比喻好上加好", difficulty: "intermediate" },
        { idiom: "花好月圆", pinyin: "hua hao yue yuan", first_char: "花", last_char: "圆", first_pinyin: "hua", last_pinyin: "yuan", meaning: "比喻美满幸福", difficulty: "intermediate" },
        { idiom: "圆满成功", pinyin: "yuan man cheng gong", first_char: "圆", last_char: "功", first_pinyin: "yuan", last_pinyin: "gong", meaning: "完满地达到目的", difficulty: "intermediate" },
        { idiom: "功德无量", pinyin: "gong de wu liang", first_char: "功", last_char: "量", first_pinyin: "gong", last_pinyin: "liang", meaning: "功劳和恩德非常大", difficulty: "intermediate" },
        { idiom: "量力而行", pinyin: "liang li er xing", first_char: "量", last_char: "行", first_pinyin: "liang", last_pinyin: "xing", meaning: "按照自己的能力去做", difficulty: "intermediate" },
        { idiom: "行云流水", pinyin: "xing yun liu shui", first_char: "行", last_char: "水", first_pinyin: "xing", last_pinyin: "shui", meaning: "形容文章自然流畅", difficulty: "intermediate" },
        { idiom: "水到渠成", pinyin: "shui dao qu cheng", first_char: "水", last_char: "成", first_pinyin: "shui", last_pinyin: "cheng", meaning: "条件成熟，事情自然成功", difficulty: "intermediate" },
        { idiom: "成竹在胸", pinyin: "cheng zhu zai xiong", first_char: "成", last_char: "胸", first_pinyin: "cheng", last_pinyin: "xiong", meaning: "比喻处理事情心中有数", difficulty: "intermediate" },
        { idiom: "胸有成竹", pinyin: "xiong you cheng zhu", first_char: "胸", last_char: "竹", first_pinyin: "xiong", last_pinyin: "zhu", meaning: "做事之前已有成熟的计划", difficulty: "intermediate" },
        { idiom: "竹报平安", pinyin: "zhu bao ping an", first_char: "竹", last_char: "安", first_pinyin: "zhu", last_pinyin: "an", meaning: "比喻报告家人平安的消息", difficulty: "intermediate" },
        { idiom: "安居乐业", pinyin: "an ju le ye", first_char: "安", last_char: "业", first_pinyin: "an", last_pinyin: "ye", meaning: "生活安定，工作愉快", difficulty: "intermediate" },
        { idiom: "业精于勤", pinyin: "ye jing yu qin", first_char: "业", last_char: "勤", first_pinyin: "ye", last_pinyin: "qin", meaning: "学业要靠勤奋才能精通", difficulty: "intermediate" },
        { idiom: "勤能补拙", pinyin: "qin neng bu zhuo", first_char: "勤", last_char: "拙", first_pinyin: "qin", last_pinyin: "zhuo", meaning: "勤奋可以弥补不足", difficulty: "intermediate" },
        { idiom: "拙口笨腮", pinyin: "zhuo kou ben sai", first_char: "拙", last_char: "腮", first_pinyin: "zhuo", last_pinyin: "sai", meaning: "嘴笨，不善言辞", difficulty: "intermediate" },
        { idiom: "龙飞凤舞", pinyin: "long fei feng wu", first_char: "龙", last_char: "舞", first_pinyin: "long", last_pinyin: "wu", meaning: "形容书法笔势或建筑雄伟", difficulty: "intermediate" },
        { idiom: "舞文弄墨", pinyin: "wu wen nong mo", first_char: "舞", last_char: "墨", first_pinyin: "wu", last_pinyin: "mo", meaning: "玩弄文字技巧", difficulty: "intermediate" },
        { idiom: "墨守成规", pinyin: "mo shou cheng gui", first_char: "墨", last_char: "规", first_pinyin: "mo", last_pinyin: "gui", meaning: "死守老规矩不变通", difficulty: "intermediate" },
        { idiom: "散兵游勇", pinyin: "san bing you yong", first_char: "散", last_char: "勇", first_pinyin: "san", last_pinyin: "yong", meaning: "没有统一指挥的士兵", difficulty: "intermediate" },

        // Advanced (hard) idioms - 49 idioms
        { idiom: "规行矩步", pinyin: "gui xing ju bu", first_char: "规", last_char: "步", first_pinyin: "gui", last_pinyin: "bu", meaning: "举止合乎规矩", difficulty: "advanced" },
        { idiom: "步履蹒跚", pinyin: "bu lv pan shan", first_char: "步", last_char: "跚", first_pinyin: "bu", last_pinyin: "shan", meaning: "走路摇摆不稳", difficulty: "advanced" },
        { idiom: "蹒跚学步", pinyin: "pan shan xue bu", first_char: "蹒", last_char: "步", first_pinyin: "pan", last_pinyin: "bu", meaning: "比喻做事刚开始", difficulty: "advanced" },
        { idiom: "沧海桑田", pinyin: "cang hai sang tian", first_char: "沧", last_char: "田", first_pinyin: "cang", last_pinyin: "tian", meaning: "世事变化很大", difficulty: "advanced" },
        { idiom: "田连阡陌", pinyin: "tian lian qian mo", first_char: "田", last_char: "陌", first_pinyin: "tian", last_pinyin: "mo", meaning: "田地广阔连成一片", difficulty: "advanced" },
        { idiom: "陌路殊途", pinyin: "mo lu shu tu", first_char: "陌", last_char: "途", first_pinyin: "mo", last_pinyin: "tu", meaning: "比喻各走各的路", difficulty: "advanced" },
        { idiom: "途穷日暮", pinyin: "tu qiong ri mu", first_char: "途", last_char: "暮", first_pinyin: "tu", last_pinyin: "mu", meaning: "比喻处境十分困难", difficulty: "advanced" },
        { idiom: "暮鼓晨钟", pinyin: "mu gu chen zhong", first_char: "暮", last_char: "钟", first_pinyin: "mu", last_pinyin: "zhong", meaning: "比喻使人警觉的言论", difficulty: "advanced" },
        { idiom: "钟灵毓秀", pinyin: "zhong ling yu xiu", first_char: "钟", last_char: "秀", first_pinyin: "zhong", last_pinyin: "xiu", meaning: "聚集天地灵气，孕育优秀人才", difficulty: "advanced" },
        { idiom: "秀色可餐", pinyin: "xiu se ke can", first_char: "秀", last_char: "餐", first_pinyin: "xiu", last_pinyin: "can", meaning: "形容女子容貌非常美丽", difficulty: "advanced" },
        { idiom: "餐风露宿", pinyin: "can feng lu su", first_char: "餐", last_char: "宿", first_pinyin: "can", last_pinyin: "su", meaning: "形容旅途艰辛", difficulty: "advanced" },
        { idiom: "宿命通达", pinyin: "su ming tong da", first_char: "宿", last_char: "达", first_pinyin: "su", last_pinyin: "da", meaning: "对命运通透理解", difficulty: "advanced" },
        { idiom: "披荆斩棘", pinyin: "pi jing zhan ji", first_char: "披", last_char: "棘", first_pinyin: "pi", last_pinyin: "ji", meaning: "比喻克服困难，开创局面", difficulty: "advanced" },
        { idiom: "棘手难题", pinyin: "ji shou nan ti", first_char: "棘", last_char: "题", first_pinyin: "ji", last_pinyin: "ti", meaning: "难以处理的问题", difficulty: "advanced" },
        { idiom: "题名道姓", pinyin: "ti ming dao xing", first_char: "题", last_char: "姓", first_pinyin: "ti", last_pinyin: "xing", meaning: "指名道姓地说", difficulty: "advanced" },
        { idiom: "姓甚名谁", pinyin: "xing shen ming shui", first_char: "姓", last_char: "谁", first_pinyin: "xing", last_pinyin: "shui", meaning: "询问姓名", difficulty: "advanced" },
        { idiom: "运筹帷幄", pinyin: "yun chou wei wo", first_char: "运", last_char: "幄", first_pinyin: "yun", last_pinyin: "wo", meaning: "在后方策划指挥", difficulty: "advanced" },
        { idiom: "未雨绸缪", pinyin: "wei yu chou mou", first_char: "未", last_char: "缪", first_pinyin: "wei", last_pinyin: "miu", meaning: "事先做好准备", difficulty: "advanced" },
        { idiom: "缪种流传", pinyin: "miu zhong liu chuan", first_char: "缪", last_char: "传", first_pinyin: "miu", last_pinyin: "chuan", meaning: "错误的观点流传下来", difficulty: "advanced" },
        { idiom: "传檄而定", pinyin: "chuan xi er ding", first_char: "传", last_char: "定", first_pinyin: "chuan", last_pinyin: "ding", meaning: "比喻不战而胜", difficulty: "advanced" },
        { idiom: "定国安邦", pinyin: "ding guo an bang", first_char: "定", last_char: "邦", first_pinyin: "ding", last_pinyin: "bang", meaning: "安定国家", difficulty: "advanced" },
        { idiom: "邦国殄瘁", pinyin: "bang guo tian cui", first_char: "邦", last_char: "瘁", first_pinyin: "bang", last_pinyin: "cui", meaning: "国家衰败困苦", difficulty: "advanced" },
        { idiom: "瘁心于学", pinyin: "cui xin yu xue", first_char: "瘁", last_char: "学", first_pinyin: "cui", last_pinyin: "xue", meaning: "竭尽心力从事学问", difficulty: "advanced" },
        { idiom: "学富五车", pinyin: "xue fu wu che", first_char: "学", last_char: "车", first_pinyin: "xue", last_pinyin: "che", meaning: "形容读书多，学识渊博", difficulty: "advanced" },
        { idiom: "车水马龙", pinyin: "che shui ma long", first_char: "车", last_char: "龙", first_pinyin: "che", last_pinyin: "long", meaning: "形容车马往来不绝", difficulty: "advanced" },
        { idiom: "龙腾虎跃", pinyin: "long teng hu yue", first_char: "龙", last_char: "跃", first_pinyin: "long", last_pinyin: "yue", meaning: "比喻气势雄壮", difficulty: "advanced" },
        { idiom: "跃跃欲试", pinyin: "yue yue yu shi", first_char: "跃", last_char: "试", first_pinyin: "yue", last_pinyin: "shi", meaning: "形容急切地想要尝试", difficulty: "advanced" },
        { idiom: "试目以待", pinyin: "shi mu yi dai", first_char: "试", last_char: "待", first_pinyin: "shi", last_pinyin: "dai", meaning: "等待观察结果", difficulty: "advanced" },
        { idiom: "待字闺中", pinyin: "dai zi gui zhong", first_char: "待", last_char: "中", first_pinyin: "dai", last_pinyin: "zhong", meaning: "指女子尚未出嫁", difficulty: "advanced" },
        { idiom: "鬼斧神工", pinyin: "gui fu shen gong", first_char: "鬼", last_char: "工", first_pinyin: "gui", last_pinyin: "gong", meaning: "形容技艺精湛", difficulty: "advanced" },
        { idiom: "工力悉敌", pinyin: "gong li xi di", first_char: "工", last_char: "敌", first_pinyin: "gong", last_pinyin: "di", meaning: "双方功力不相上下", difficulty: "advanced" },
        { idiom: "敌忾同仇", pinyin: "di kai tong chou", first_char: "敌", last_char: "仇", first_pinyin: "di", last_pinyin: "chou", meaning: "共同仇恨敌人", difficulty: "advanced" },
        { idiom: "仇深似海", pinyin: "chou shen si hai", first_char: "仇", last_char: "海", first_pinyin: "chou", last_pinyin: "hai", meaning: "仇恨极深", difficulty: "advanced" },
        { idiom: "海枯石烂", pinyin: "hai ku shi lan", first_char: "海", last_char: "烂", first_pinyin: "hai", last_pinyin: "lan", meaning: "形容永远不变", difficulty: "advanced" },
        { idiom: "烂漫天真", pinyin: "lan man tian zhen", first_char: "烂", last_char: "真", first_pinyin: "lan", last_pinyin: "zhen", meaning: "形容性格纯真无邪", difficulty: "advanced" },
        { idiom: "真知灼见", pinyin: "zhen zhi zhuo jian", first_char: "真", last_char: "见", first_pinyin: "zhen", last_pinyin: "jian", meaning: "正确深刻的见解", difficulty: "advanced" },
        { idiom: "见微知著", pinyin: "jian wei zhi zhu", first_char: "见", last_char: "著", first_pinyin: "jian", last_pinyin: "zhu", meaning: "从小事可以推知大事", difficulty: "advanced" },
        { idiom: "著作等身", pinyin: "zhu zuo deng shen", first_char: "著", last_char: "身", first_pinyin: "zhu", last_pinyin: "shen", meaning: "形容著述极多", difficulty: "advanced" },
        { idiom: "身临其境", pinyin: "shen lin qi jing", first_char: "身", last_char: "境", first_pinyin: "shen", last_pinyin: "jing", meaning: "亲自到了那个地方", difficulty: "advanced" },
        { idiom: "境由心生", pinyin: "jing you xin sheng", first_char: "境", last_char: "生", first_pinyin: "jing", last_pinyin: "sheng", meaning: "环境取决于心态", difficulty: "advanced" },
        { idiom: "生龙活虎", pinyin: "sheng long huo hu", first_char: "生", last_char: "虎", first_pinyin: "sheng", last_pinyin: "hu", meaning: "形容精力充沛", difficulty: "advanced" },
        { idiom: "虎啸龙吟", pinyin: "hu xiao long yin", first_char: "虎", last_char: "吟", first_pinyin: "hu", last_pinyin: "yin", meaning: "形容声势浩大", difficulty: "advanced" },
        { idiom: "吟风弄月", pinyin: "yin feng nong yue", first_char: "吟", last_char: "月", first_pinyin: "yin", last_pinyin: "yue", meaning: "形容诗人创作风雅情趣", difficulty: "advanced" },
        { idiom: "月明星稀", pinyin: "yue ming xing xi", first_char: "月", last_char: "稀", first_pinyin: "yue", last_pinyin: "xi", meaning: "月亮明亮星星稀疏", difficulty: "advanced" },
        { idiom: "稀世珍宝", pinyin: "xi shi zhen bao", first_char: "稀", last_char: "宝", first_pinyin: "xi", last_pinyin: "bao", meaning: "世间罕有的珍贵物品", difficulty: "advanced" },
        { idiom: "宝刀不老", pinyin: "bao dao bu lao", first_char: "宝", last_char: "老", first_pinyin: "bao", last_pinyin: "lao", meaning: "比喻虽然年老但雄风犹在", difficulty: "advanced" },
        { idiom: "老骥伏枥", pinyin: "lao ji fu li", first_char: "老", last_char: "枥", first_pinyin: "lao", last_pinyin: "li", meaning: "老年人仍有志向", difficulty: "advanced" },
        { idiom: "栉风沐雨", pinyin: "zhi feng mu yu", first_char: "栉", last_char: "雨", first_pinyin: "zhi", last_pinyin: "yu", meaning: "形容旅途的辛苦", difficulty: "advanced" },
        { idiom: "雨后春笋", pinyin: "yu hou chun sun", first_char: "雨", last_char: "笋", first_pinyin: "yu", last_pinyin: "sun", meaning: "比喻新生事物大量涌现", difficulty: "advanced" }
    ];

    // ===========================================
    // GAME CONFIGURATION
    // ===========================================
    const CONFIG = {
        canvas: { width: 800, height: 600 },
        colors: {
            background: "#F5F0E6",
            primary: "#B22222",
            secondary: "#8B7355",
            accent: "#228B22",
            text: "#2C2C2C",
            panel: "#FBF7F0",
            inputBg: "#FFFFFF",
            timerWarning: "#FFA500",
            timerCritical: "#B22222"
        },
        fonts: {
            primary: "KaiTi, STKaiti, serif",
            score: "Arial, sans-serif"
        },
        scoring: {
            easy: 10,
            medium: 20,
            hard: 30,
            combo3: 15,
            combo5: 30,
            combo10: 50,
            hintCost: -5,
            timeBonus10: 10,
            timeBonus20: 20,
            levelComplete: 100,
            noHintBonus: 50
        },
        lives: {
            initial: 3,
            max: 3
        },
        levels: [
            { number: 1, difficulty: "easy", required: 5, timeLimit: 45, idiomDifficulty: ["common"] },
            { number: 2, difficulty: "easy", required: 6, timeLimit: 40, idiomDifficulty: ["common"] },
            { number: 3, difficulty: "medium", required: 6, timeLimit: 35, idiomDifficulty: ["common", "intermediate"] },
            { number: 4, difficulty: "medium", required: 7, timeLimit: 35, idiomDifficulty: ["intermediate"] },
            { number: 5, difficulty: "hard", required: 7, timeLimit: 30, idiomDifficulty: ["intermediate", "advanced"] },
            { number: 6, difficulty: "hard", required: 8, timeLimit: 30, idiomDifficulty: ["advanced"] }
        ],
        timer: {
            warningThreshold: 10,
            criticalThreshold: 5
        },
        controls: {
            submit: "Enter",
            hint: "Tab",
            pause: "Escape"
        }
    };

    // ===========================================
    // GAME STATE
    // ===========================================
    const gameState = {
        currentIdiom: null,
        playerInput: "",
        score: 0,
        combo: 0,
        maxCombo: 0,
        chances: CONFIG.lives.initial,
        level: 1,
        difficulty: "easy",
        progress: { current: 0, required: 5 },
        timer: 45,
        history: [],
        gameState: "menu", // menu, playing, paused, levelComplete, gameOver
        highScore: 0,
        hintUsed: false,
        hintShowing: false,
        hintText: "",
        usedIdioms: new Set(),
        levelScore: 0,
        lastAnswerCorrect: null,
        feedbackTimer: 0,
        comboPopup: null
    };

    // ===========================================
    // CANVAS & DOM ELEMENTS
    // ===========================================
    let canvas, ctx;
    let textInput, hintTooltip;
    let animationFrameId;
    let lastTime = 0;
    let timerInterval = null;
    let scale = 1; // Scale factor for responsive canvas

    // ===========================================
    // ASSET LOADING
    // ===========================================
    const assets = {};
    const assetList = [
        'bg_ink_wash', 'panel_header', 'panel_idiom', 'panel_meaning',
        'panel_input', 'panel_history', 'input_box', 'btn_submit',
        'btn_hint', 'btn_skip', 'seal_character', 'icon_score',
        'icon_combo', 'icon_timer', 'icon_heart_full', 'icon_heart_empty',
        'icon_book', 'icon_arrow', 'bar_timer_bg', 'bar_timer',
        'bar_progress_bg', 'bar_progress', 'badge_easy', 'badge_medium',
        'badge_hard', 'decor_bamboo_left', 'decor_bamboo_right',
        'decor_cloud', 'icon_correct', 'icon_wrong', 'idiom_card', 'chain_connector'
    ];
    let assetsLoaded = 0;
    let assetsReady = false;

    function loadAssets(callback) {
        let loadedCount = 0;
        const totalAssets = assetList.length;

        assetList.forEach(id => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                assetsLoaded = loadedCount;
                if (loadedCount === totalAssets) {
                    assetsReady = true;
                    callback();
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load asset: ${id}`);
                loadedCount++;
                assetsLoaded = loadedCount;
                if (loadedCount === totalAssets) {
                    assetsReady = true;
                    callback();
                }
            };
            img.src = `assets/${id}.png`;
            assets[id] = img;
        });
    }

    // ===========================================
    // INITIALIZATION
    // ===========================================
    function init() {
        canvas = document.getElementById("gameCanvas");
        ctx = canvas.getContext("2d");
        textInput = document.getElementById("text-input");
        hintTooltip = document.getElementById("hint-tooltip");

        // Load high score from localStorage
        const savedHighScore = localStorage.getItem("idiomChainHighScore");
        if (savedHighScore) {
            gameState.highScore = parseInt(savedHighScore, 10);
        }

        // Handle window resize for responsive scaling
        updateScale();
        window.addEventListener("resize", updateScale);
        window.addEventListener("orientationchange", () => {
            setTimeout(updateScale, 100);
        });

        // Show loading screen and load assets
        showLoadingScreen();
        loadAssets(() => {
            setupEventListeners();
            gameLoop(0);
        });
    }

    function updateScale() {
        const container = document.getElementById("game-container");
        const containerWidth = container.clientWidth;
        scale = containerWidth / CONFIG.canvas.width;
    }

    function showLoadingScreen() {
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(0, 0, 800, 600);
        ctx.font = "32px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.textAlign = "center";
        ctx.fillText("墨韵成语", 400, 260);
        ctx.font = "18px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.secondary;
        ctx.fillText("加载中...", 400, 300);
    }

    function setupEventListeners() {
        // Keyboard events
        document.addEventListener("keydown", handleKeyDown);

        // Input field events
        textInput.addEventListener("input", (e) => {
            gameState.playerInput = e.target.value;
        });

        textInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                submitAnswer();
            }
            // Prevent Tab from leaving input field during game
            if (e.key === "Tab" && gameState.gameState === "playing") {
                e.preventDefault();
                useHint();
            }
        });

        // Canvas click events
        canvas.addEventListener("click", handleCanvasClick);

        // Touch events for mobile
        canvas.addEventListener("touchstart", handleCanvasTouch, { passive: false });
    }

    function handleCanvasTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / scale;
        const y = (touch.clientY - rect.top) / scale;

        handleClick(x, y);
    }

    function handleKeyDown(e) {
        if (e.key === CONFIG.controls.pause) {
            if (gameState.gameState === "playing") {
                pauseGame();
            } else if (gameState.gameState === "paused") {
                resumeGame();
            }
        }
        // Only handle Tab if not in input field (input handles it separately)
        if (e.key === CONFIG.controls.hint && gameState.gameState === "playing" && document.activeElement !== textInput) {
            e.preventDefault();
            useHint();
        }
    }

    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        handleClick(x, y);
    }

    function handleClick(x, y) {
        if (gameState.gameState === "menu") {
            handleMenuClick(x, y);
        } else if (gameState.gameState === "playing") {
            handleGameClick(x, y);
        } else if (gameState.gameState === "paused") {
            handlePauseClick(x, y);
        } else if (gameState.gameState === "levelComplete") {
            handleLevelCompleteClick(x, y);
        } else if (gameState.gameState === "gameOver") {
            handleGameOverClick(x, y);
        }
    }

    // ===========================================
    // MENU HANDLING
    // ===========================================
    function handleMenuClick(x, y) {
        // Easy button: centered at 400, y=350, size ~180x50
        if (x >= 310 && x <= 490 && y >= 325 && y <= 375) {
            startGame("easy");
        }
        // Medium button: centered at 400, y=410
        else if (x >= 310 && x <= 490 && y >= 385 && y <= 435) {
            startGame("medium");
        }
        // Hard button: centered at 400, y=470
        else if (x >= 310 && x <= 490 && y >= 445 && y <= 495) {
            startGame("hard");
        }
    }

    function handlePauseClick(x, y) {
        // Resume button: 400, 320
        if (x >= 310 && x <= 490 && y >= 295 && y <= 345) {
            resumeGame();
        }
        // Restart button: 400, 390
        else if (x >= 310 && x <= 490 && y >= 365 && y <= 415) {
            restartGame();
        }
        // Menu button: 400, 460
        else if (x >= 310 && x <= 490 && y >= 435 && y <= 485) {
            goToMenu();
        }
    }

    function handleLevelCompleteClick(x, y) {
        // Next level button: 400, 420
        if (x >= 310 && x <= 490 && y >= 395 && y <= 445) {
            nextLevel();
        }
        // Menu button: 400, 490
        else if (x >= 310 && x <= 490 && y >= 465 && y <= 515) {
            goToMenu();
        }
    }

    function handleGameOverClick(x, y) {
        // Retry button: 400, 455
        if (x >= 310 && x <= 490 && y >= 430 && y <= 480) {
            restartGame();
        }
        // Menu button: 400, 520
        else if (x >= 310 && x <= 490 && y >= 495 && y <= 545) {
            goToMenu();
        }
    }

    function handleGameClick(x, y) {
        // Submit button: 600, 375, 80x50
        if (x >= 600 && x <= 680 && y >= 375 && y <= 425) {
            submitAnswer();
        }
        // Hint button: 270, 430, 100x35
        else if (x >= 270 && x <= 370 && y >= 430 && y <= 465) {
            useHint();
        }
        // Skip button: 380, 430, 100x35
        else if (x >= 380 && x <= 480 && y >= 430 && y <= 465) {
            skipIdiom();
        }
        // Input field area: 270, 375, 320x50
        else if (x >= 270 && x <= 590 && y >= 375 && y <= 425) {
            textInput.focus();
        }
    }

    // ===========================================
    // GAME CONTROL FUNCTIONS
    // ===========================================
    function startGame(difficulty) {
        gameState.gameState = "playing";
        gameState.difficulty = difficulty;
        gameState.score = 0;
        gameState.combo = 0;
        gameState.maxCombo = 0;
        gameState.chances = CONFIG.lives.initial;
        gameState.history = [];
        gameState.usedIdioms = new Set();
        gameState.levelScore = 0;
        gameState.hintUsed = false;

        // Set starting level based on difficulty
        if (difficulty === "easy") {
            gameState.level = 1;
        } else if (difficulty === "medium") {
            gameState.level = 3;
        } else {
            gameState.level = 5;
        }

        initLevel();
        showInput();
        startTimer();
    }

    function initLevel() {
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[CONFIG.levels.length - 1];
        gameState.progress = { current: 0, required: levelConfig.required };
        gameState.timer = levelConfig.timeLimit;
        gameState.levelScore = 0;
        gameState.hintUsed = false;

        // Get a random starting idiom
        selectNewIdiom(levelConfig.idiomDifficulty);
    }

    function selectNewIdiom(difficulties, lastChar = null, lastPinyin = null) {
        let candidates = IDIOM_DATABASE.filter(idiom => {
            // Check difficulty match
            if (!difficulties.includes(idiom.difficulty)) {
                return false;
            }
            // Check if already used
            if (gameState.usedIdioms.has(idiom.idiom)) {
                return false;
            }
            // If we need to chain, check character or pinyin match
            if (lastChar || lastPinyin) {
                return idiom.first_char === lastChar || idiom.first_pinyin === lastPinyin;
            }
            return true;
        });

        if (candidates.length === 0) {
            // If no matching idioms, try without the chain constraint
            candidates = IDIOM_DATABASE.filter(idiom => {
                if (!difficulties.includes(idiom.difficulty)) {
                    return false;
                }
                return !gameState.usedIdioms.has(idiom.idiom);
            });
        }

        if (candidates.length === 0) {
            // Reset used idioms if we've exhausted all options
            gameState.usedIdioms.clear();
            candidates = IDIOM_DATABASE.filter(idiom => difficulties.includes(idiom.difficulty));
        }

        const randomIndex = Math.floor(Math.random() * candidates.length);
        gameState.currentIdiom = candidates[randomIndex];
        gameState.usedIdioms.add(gameState.currentIdiom.idiom);
    }

    function submitAnswer() {
        if (gameState.gameState !== "playing") return;

        const input = gameState.playerInput.trim();
        if (input.length < 4) {
            showFeedback(false, "请输入完整的成语（至少4个字）");
            return;
        }

        // Check if the idiom exists in database
        const matchedIdiom = IDIOM_DATABASE.find(idiom => idiom.idiom === input);
        if (!matchedIdiom) {
            showFeedback(false, "该成语不在词库中");
            handleWrongAnswer();
            return;
        }

        // Check if already used
        if (gameState.usedIdioms.has(input) && input !== gameState.currentIdiom.idiom) {
            showFeedback(false, "该成语已经使用过了");
            handleWrongAnswer();
            return;
        }

        // Check if it chains correctly (same character or homophone)
        const lastChar = gameState.currentIdiom.last_char;
        const lastPinyin = gameState.currentIdiom.last_pinyin;
        const firstChar = matchedIdiom.first_char;
        const firstPinyin = matchedIdiom.first_pinyin;

        if (firstChar !== lastChar && firstPinyin !== lastPinyin) {
            showFeedback(false, `需要以"${lastChar}"(${lastPinyin})开头的成语`);
            handleWrongAnswer();
            return;
        }

        // Correct answer!
        handleCorrectAnswer(matchedIdiom);
    }

    function handleCorrectAnswer(matchedIdiom) {
        // Add to history
        gameState.history.push({
            idiom: gameState.currentIdiom.idiom,
            connector: matchedIdiom.first_char === gameState.currentIdiom.last_char ? "同字" : "同音"
        });

        // Calculate score
        let points = 0;
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
        if (levelConfig.difficulty === "easy") points = CONFIG.scoring.easy;
        else if (levelConfig.difficulty === "medium") points = CONFIG.scoring.medium;
        else points = CONFIG.scoring.hard;

        // Time bonus - more time remaining = higher bonus
        if (gameState.timer >= 20) points += CONFIG.scoring.timeBonus20;
        else if (gameState.timer >= 10) points += CONFIG.scoring.timeBonus10;

        // Combo
        gameState.combo++;
        if (gameState.combo > gameState.maxCombo) {
            gameState.maxCombo = gameState.combo;
        }

        // Combo bonus
        if (gameState.combo === 3) points += CONFIG.scoring.combo3;
        else if (gameState.combo === 5) points += CONFIG.scoring.combo5;
        else if (gameState.combo === 10) points += CONFIG.scoring.combo10;

        gameState.score += points;
        gameState.levelScore += points;
        gameState.progress.current++;

        // Show combo popup
        if (gameState.combo >= 3) {
            let message = "";
            if (gameState.combo >= 10) message = "登峰造极!";
            else if (gameState.combo >= 5) message = "太棒了!";
            else message = "不错!";
            showComboPopup(message, gameState.combo);
        }

        showFeedback(true, `+${points}分`);
        createInkSplash(400, 300);

        // Check level completion
        if (gameState.progress.current >= gameState.progress.required) {
            completeLevel();
            return;
        }

        // Select next idiom (chaining from the player's answer)
        gameState.usedIdioms.add(matchedIdiom.idiom);
        gameState.currentIdiom = matchedIdiom;

        // Reset timer
        resetTimer();
        clearInput();
        hideHint();
    }

    function handleWrongAnswer() {
        gameState.combo = 0;
        gameState.chances--;

        if (gameState.chances <= 0) {
            endGame();
        }

        clearInput();
    }

    function useHint() {
        if (gameState.gameState !== "playing") return;
        if (gameState.hintShowing) {
            hideHint();
            return;
        }

        // Find a valid answer
        const lastChar = gameState.currentIdiom.last_char;
        const lastPinyin = gameState.currentIdiom.last_pinyin;
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];

        const validIdioms = getAvailableIdioms(lastChar, lastPinyin, levelConfig.idiomDifficulty);

        if (validIdioms.length > 0) {
            const hint = validIdioms[0];
            gameState.hintText = `提示: ${hint.idiom.charAt(0)}__${hint.idiom.charAt(3)} (${hint.pinyin.split(" ")[0]}...)`;
            gameState.hintShowing = true;
            gameState.hintUsed = true;

            // Deduct points
            gameState.score = Math.max(0, gameState.score + CONFIG.scoring.hintCost);

            showHintTooltip();
        } else {
            gameState.hintText = "暂无可用提示";
            gameState.hintShowing = true;
            showHintTooltip();
        }
    }

    function hideHint() {
        gameState.hintShowing = false;
        hintTooltip.style.display = "none";
    }

    function showHintTooltip() {
        hintTooltip.textContent = gameState.hintText;
        hintTooltip.style.display = "block";
        // Position is now handled by CSS percentages
    }

    function skipIdiom() {
        if (gameState.gameState !== "playing") return;

        // Penalize: lose one chance
        gameState.chances--;
        gameState.combo = 0;

        if (gameState.chances <= 0) {
            endGame();
            return;
        }

        // Get a new idiom
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
        selectNewIdiom(levelConfig.idiomDifficulty);
        resetTimer();
        clearInput();
        hideHint();
    }

    function getAvailableIdioms(lastChar, lastPinyin, difficulties) {
        return IDIOM_DATABASE.filter(idiom => {
            if (!difficulties.includes(idiom.difficulty)) {
                return false;
            }
            if (gameState.usedIdioms.has(idiom.idiom)) {
                return false;
            }
            return idiom.first_char === lastChar || idiom.first_pinyin === lastPinyin;
        });
    }

    // ===========================================
    // TIMER FUNCTIONS
    // ===========================================
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (gameState.gameState === "playing") {
                gameState.timer--;
                if (gameState.timer <= 0) {
                    handleTimeout();
                }
            }
        }, 1000);
    }

    function resetTimer() {
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
        gameState.timer = levelConfig.timeLimit;
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function handleTimeout() {
        gameState.chances--;
        gameState.combo = 0;
        showFeedback(false, "时间到!");

        if (gameState.chances <= 0) {
            endGame();
            return;
        }

        // Get a new idiom
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
        selectNewIdiom(levelConfig.idiomDifficulty);
        resetTimer();
        clearInput();
        hideHint();
    }

    // ===========================================
    // LEVEL & GAME STATE TRANSITIONS
    // ===========================================
    function completeLevel() {
        stopTimer();
        hideInput();
        hideHint();

        // No hint bonus
        if (!gameState.hintUsed) {
            gameState.score += CONFIG.scoring.noHintBonus;
            gameState.levelScore += CONFIG.scoring.noHintBonus;
        }

        // Level complete bonus
        gameState.score += CONFIG.scoring.levelComplete;
        gameState.levelScore += CONFIG.scoring.levelComplete;

        gameState.gameState = "levelComplete";

        // Update high score
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem("idiomChainHighScore", gameState.highScore.toString());
        }
    }

    function nextLevel() {
        gameState.level++;
        if (gameState.level > CONFIG.levels.length) {
            // Player completed all levels - show victory
            endGame(true);
            return;
        }

        gameState.gameState = "playing";
        initLevel();
        showInput();
        startTimer();
    }

    function endGame(victory = false) {
        stopTimer();
        hideInput();
        hideHint();

        // Update high score
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem("idiomChainHighScore", gameState.highScore.toString());
        }

        gameState.gameState = "gameOver";
    }

    function pauseGame() {
        gameState.gameState = "paused";
        hideInput();
        hideHint();
    }

    function resumeGame() {
        gameState.gameState = "playing";
        showInput();
    }

    function restartGame() {
        startGame(gameState.difficulty);
    }

    function goToMenu() {
        stopTimer();
        hideInput();
        hideHint();
        gameState.gameState = "menu";
    }

    // ===========================================
    // UI HELPERS
    // ===========================================
    function showInput() {
        textInput.classList.add("visible");
        textInput.value = "";
        textInput.focus();
    }

    function hideInput() {
        textInput.classList.remove("visible");
        textInput.blur();
    }

    function clearInput() {
        textInput.value = "";
        gameState.playerInput = "";
    }

    function showFeedback(correct, message) {
        gameState.lastAnswerCorrect = correct;
        gameState.feedbackTimer = 60; // 1 second at 60fps
    }

    function showComboPopup(message, combo) {
        gameState.comboPopup = {
            message: `${message} x${combo}`,
            timer: 60,
            x: 400,
            y: 300
        };
    }

    function createInkSplash(x, y) {
        const splash = document.createElement("div");
        splash.className = "ink-splash";
        // Scale the position for responsive layout
        const container = document.getElementById("game-container");
        const scaledX = (x / CONFIG.canvas.width) * container.clientWidth;
        const scaledY = (y / CONFIG.canvas.height) * container.clientHeight;
        splash.style.left = (scaledX - 30 * scale) + "px";
        splash.style.top = (scaledY - 30 * scale) + "px";
        splash.style.transform = `scale(${scale})`;
        container.appendChild(splash);
        setTimeout(() => splash.remove(), 600);
    }

    // ===========================================
    // RENDERING
    // ===========================================
    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        update(deltaTime);
        render();

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function update(deltaTime) {
        // Update feedback timer
        if (gameState.feedbackTimer > 0) {
            gameState.feedbackTimer--;
        }

        // Update combo popup
        if (gameState.comboPopup && gameState.comboPopup.timer > 0) {
            gameState.comboPopup.timer--;
            gameState.comboPopup.y -= 0.5;
        }
    }

    function render() {
        // Clear canvas
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);

        switch (gameState.gameState) {
            case "menu":
                renderMenu();
                break;
            case "playing":
                renderGame();
                break;
            case "paused":
                renderGame();
                renderPauseOverlay();
                break;
            case "levelComplete":
                renderLevelComplete();
                break;
            case "gameOver":
                renderGameOver();
                break;
        }
    }

    function renderMenu() {
        // Draw decorative elements
        drawDecorations();

        // Title
        ctx.font = "72px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.textAlign = "center";
        ctx.fillText("墨韵成语", 400, 180);

        // Subtitle
        ctx.font = "24px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.secondary;
        ctx.fillText("中华成语接龙", 400, 230);

        // Buttons
        drawButton(400, 350, 180, 50, "初级挑战", CONFIG.colors.accent);
        drawButton(400, 410, 180, 50, "中级挑战", "#DAA520");
        drawButton(400, 470, 180, 50, "高级挑战", CONFIG.colors.primary);

        // High score
        ctx.font = "18px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.secondary;
        ctx.fillText(`最高分: ${gameState.highScore}`, 400, 540);
    }

    function renderGame() {
        // Draw decorative elements
        drawDecorations();

        // Header panel (使用占位符渲染)
        ctx.fillStyle = "#E8DDD0";
        ctx.fillRect(0, 0, 800, 80);

        // Title
        ctx.font = "32px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.textAlign = "center";
        ctx.fillText("墨韵成语", 400, 45);

        // Level info
        ctx.font = "18px KaiTi, STKaiti, serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "#5C4033";
        ctx.fillText(`第${gameState.level}关`, 20, 35);

        // Difficulty badge (使用占位符渲染)
        const diffColors = { easy: "#90EE90", medium: "#FFB347", hard: "#FF6B6B" };
        const diffTexts = { easy: "简单", medium: "普通", hard: "困难" };
        const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
        ctx.fillStyle = diffColors[levelConfig.difficulty];
        roundRect(ctx, 20, 45, 60, 24, 4, true, false);
        ctx.font = "14px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(diffTexts[levelConfig.difficulty], 50, 62);

        // Score icon (使用占位符渲染)
        ctx.fillStyle = "#CD853F";
        ctx.beginPath();
        ctx.arc(635, 30, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(629, 24, 12, 12);
        ctx.font = "24px Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "#8B4513";
        ctx.fillText(gameState.score.toString(), 660, 38);

        // Combo (使用占位符渲染)
        if (gameState.combo > 0) {
            ctx.fillStyle = "#FF6B35";
            ctx.font = "18px Arial, sans-serif";
            ctx.fillText(`x${gameState.combo}`, 660, 65);
        }

        // Timer icon (使用占位符渲染)
        const timerColor = gameState.timer <= CONFIG.timer.criticalThreshold ? CONFIG.colors.timerCritical :
                          gameState.timer <= CONFIG.timer.warningThreshold ? CONFIG.colors.timerWarning :
                          "#228B22";
        ctx.fillStyle = "#8B7355";
        ctx.fillRect(338, 92, 36, 36);
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(344, 98, 24, 24);

        ctx.font = "28px Arial, sans-serif";
        ctx.fillStyle = timerColor;
        ctx.textAlign = "left";
        ctx.fillText(gameState.timer.toString(), 382, 122);

        // Timer bar
        ctx.fillStyle = "#D0D0D0";
        roundRect(ctx, 200, 130, 400, 8, 4, true, false);
        const timerPercent = gameState.timer / levelConfig.timeLimit;
        const barColor = timerPercent > 0.5 ? "#4CAF50" : timerPercent > 0.25 ? "#FFA500" : "#B22222";
        ctx.fillStyle = barColor;
        roundRect(ctx, 200, 130, 400 * timerPercent, 8, 4, true, false);

        // Chances (hearts) - 使用占位符渲染
        ctx.font = "14px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#666";
        ctx.textAlign = "left";
        ctx.fillText("机会", 20, 115);
        for (let i = 0; i < CONFIG.lives.max; i++) {
            const hx = 75 + i * 33;
            const hy = 98;
            ctx.fillStyle = i < gameState.chances ? "#E74C3C" : "#AAAAAA";
            ctx.beginPath();
            ctx.moveTo(hx + 14, hy + 4);
            ctx.bezierCurveTo(hx - 14, hy - 10, hx - 14, hy + 10, hx, hy + 18);
            ctx.bezierCurveTo(hx + 14, hy + 10, hx + 14, hy - 10, hx, hy + 4);
            ctx.fill();
        }

        // Progress
        ctx.font = "14px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#666";
        ctx.textAlign = "left";
        ctx.fillText("进度", 620, 107);
        ctx.font = "20px Arial, sans-serif";
        ctx.fillStyle = "#228B22";
        ctx.fillText(`${gameState.progress.current}/${gameState.progress.required}`, 680, 107);

        // Progress bar
        ctx.fillStyle = "#D4C4B0";
        roundRect(ctx, 620, 118, 160, 12, 6, true, false);
        const progressPercent = gameState.progress.current / gameState.progress.required;
        ctx.fillStyle = "#228B22";
        roundRect(ctx, 620, 118, 160 * progressPercent, 12, 6, true, false);

        // Current idiom panel (使用占位符渲染)
        ctx.fillStyle = "#FBF7F0";
        roundRect(ctx, 100, 160, 600, 120, 8, true, false);
        ctx.strokeStyle = "#8B7355";
        ctx.lineWidth = 2;
        roundRect(ctx, 100, 160, 600, 120, 8, false, true);

        ctx.font = "16px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#8B7355";
        ctx.textAlign = "left";
        ctx.fillText("当前成语", 120, 185);

        if (gameState.currentIdiom) {
            ctx.font = "42px KaiTi, STKaiti, serif";
            ctx.fillStyle = CONFIG.colors.text;
            ctx.textAlign = "center";
            ctx.fillText(gameState.currentIdiom.idiom, 400, 235);

            ctx.font = "14px Arial, sans-serif";
            ctx.fillStyle = "#999";
            ctx.fillText(gameState.currentIdiom.pinyin, 400, 265);
        }

        // Meaning panel (使用占位符渲染)
        ctx.fillStyle = "#F8F4EC";
        roundRect(ctx, 100, 290, 600, 60, 8, true, false);
        ctx.fillStyle = "#8B7355";
        ctx.fillRect(115, 305, 4, 28);
        ctx.font = "16px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#5C4033";
        ctx.textAlign = "left";
        if (gameState.currentIdiom) {
            ctx.fillText(gameState.currentIdiom.meaning, 130, 328);
        }

        // Key character hint (seal) - 使用占位符渲染
        ctx.fillStyle = "#CC3333";
        roundRect(ctx, 100, 365, 80, 80, 4, true, false);
        if (gameState.currentIdiom) {
            ctx.font = "36px KaiTi, STKaiti, serif";
            ctx.fillStyle = "#FFF";
            ctx.textAlign = "center";
            ctx.fillText(gameState.currentIdiom.last_char, 140, 420);
        }

        // Arrow (使用占位符渲染)
        ctx.strokeStyle = "#5C4033";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(195, 405);
        ctx.lineTo(225, 405);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(220, 398);
        ctx.lineTo(230, 405);
        ctx.lineTo(220, 412);
        ctx.stroke();

        // Input panel (使用占位符渲染)
        ctx.fillStyle = "#FAF6EE";
        roundRect(ctx, 250, 360, 450, 90, 8, true, false);

        // Input box (visual only, actual input is HTML)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#8B7355";
        ctx.lineWidth = 2;
        roundRect(ctx, 270, 375, 320, 50, 4, true, true);

        // Submit button (使用占位符渲染)
        ctx.fillStyle = CONFIG.colors.primary;
        roundRect(ctx, 600, 375, 80, 50, 4, true, false);
        ctx.font = "18px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText("确定", 640, 408);

        // Hint button (使用占位符渲染)
        ctx.fillStyle = "#F0E6D2";
        roundRect(ctx, 270, 430, 100, 35, 4, true, false);
        ctx.strokeStyle = "#8B7355";
        ctx.lineWidth = 1;
        roundRect(ctx, 270, 430, 100, 35, 4, false, true);
        ctx.font = "16px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#5C4033";
        ctx.fillText("提示", 320, 453);

        // Skip button (使用占位符渲染)
        ctx.fillStyle = "#E8DDD0";
        roundRect(ctx, 380, 430, 100, 35, 4, true, false);
        roundRect(ctx, 380, 430, 100, 35, 4, false, true);
        ctx.fillStyle = "#8B4513";
        ctx.fillText("跳过", 430, 453);

        // History panel (使用占位符渲染)
        ctx.fillStyle = "#F5EFE5";
        roundRect(ctx, 100, 480, 600, 100, 8, true, false);
        ctx.font = "14px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#8B7355";
        ctx.textAlign = "left";
        ctx.fillText("接龙记录", 120, 498);

        // Draw history items (使用占位符渲染)
        const historyToShow = gameState.history.slice(-4);
        let hx = 130;
        historyToShow.forEach((item, index) => {
            ctx.fillStyle = "#FFF8E7";
            roundRect(ctx, hx, 515, 120, 45, 4, true, false);
            ctx.strokeStyle = "#8B7355";
            ctx.lineWidth = 1;
            roundRect(ctx, hx, 515, 120, 45, 4, false, true);
            ctx.font = "16px KaiTi, STKaiti, serif";
            ctx.fillStyle = CONFIG.colors.text;
            ctx.textAlign = "center";
            ctx.fillText(item.idiom, hx + 60, 545);
            hx += 140;
        });

        // Feedback (使用占位符渲染)
        if (gameState.feedbackTimer > 0 && gameState.lastAnswerCorrect !== null) {
            const alpha = gameState.feedbackTimer / 60;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = gameState.lastAnswerCorrect ? "#228B22" : "#B22222";
            ctx.beginPath();
            ctx.arc(400, 220, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#FFF";
            ctx.font = "24px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(gameState.lastAnswerCorrect ? "✓" : "✗", 400, 228);
            ctx.globalAlpha = 1;
        }

        // Combo popup
        if (gameState.comboPopup && gameState.comboPopup.timer > 0) {
            const alpha = gameState.comboPopup.timer / 60;
            ctx.globalAlpha = alpha;
            ctx.font = "36px KaiTi, STKaiti, serif";
            ctx.fillStyle = "#FF6B35";
            ctx.textAlign = "center";
            ctx.fillText(gameState.comboPopup.message, gameState.comboPopup.x, gameState.comboPopup.y);
            ctx.globalAlpha = 1;
        }
    }

    function renderPauseOverlay() {
        // Semi-transparent overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, 800, 600);

        // Pause panel
        ctx.fillStyle = "#F5F0E6";
        roundRect(ctx, 250, 180, 300, 320, 12, true, false);

        // Title
        ctx.font = "48px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.textAlign = "center";
        ctx.fillText("游戏暂停", 400, 240);

        // Buttons
        drawButton(400, 320, 180, 50, "继续游戏", CONFIG.colors.accent);
        drawButton(400, 390, 180, 50, "重新开始", "#DAA520");
        drawButton(400, 460, 180, 50, "返回主菜单", "#8B4513");
    }

    function renderLevelComplete() {
        drawDecorations();

        // Panel
        ctx.fillStyle = "#F5F0E6";
        roundRect(ctx, 200, 140, 400, 380, 12, true, false);
        ctx.strokeStyle = "#228B22";
        ctx.lineWidth = 3;
        roundRect(ctx, 200, 140, 400, 380, 12, false, true);

        // Title
        ctx.font = "48px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#228B22";
        ctx.textAlign = "center";
        ctx.fillText("关卡完成!", 400, 200);

        // Stats
        ctx.font = "28px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.fillText(`本关得分: ${gameState.levelScore}`, 400, 270);

        ctx.font = "22px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#CD853F";
        ctx.fillText(`最高连击: ${gameState.maxCombo}`, 400, 320);

        ctx.fillStyle = "#5C4033";
        ctx.fillText(`总分: ${gameState.score}`, 400, 360);

        // Buttons
        drawButton(400, 420, 180, 50, "下一关", CONFIG.colors.accent);
        drawButton(400, 490, 180, 45, "返回主菜单", "#8B4513");
    }

    function renderGameOver() {
        drawDecorations();

        // Panel
        ctx.fillStyle = "#F5F0E6";
        roundRect(ctx, 200, 120, 400, 420, 12, true, false);
        ctx.strokeStyle = "#B22222";
        ctx.lineWidth = 3;
        roundRect(ctx, 200, 120, 400, 420, 12, false, true);

        // Title
        ctx.font = "48px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#B22222";
        ctx.textAlign = "center";
        ctx.fillText("游戏结束", 400, 185);

        // Stats
        ctx.font = "32px KaiTi, STKaiti, serif";
        ctx.fillStyle = CONFIG.colors.text;
        ctx.fillText(`最终得分: ${gameState.score}`, 400, 260);

        ctx.font = "22px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#CD853F";
        ctx.fillText(`最高连击: ${gameState.maxCombo}`, 400, 310);

        ctx.fillStyle = "#5C4033";
        ctx.fillText(`到达关卡: ${gameState.level}`, 400, 355);

        // New record
        if (gameState.score >= gameState.highScore && gameState.score > 0) {
            ctx.font = "24px KaiTi, STKaiti, serif";
            ctx.fillStyle = "#FFD700";
            ctx.fillText("新纪录!", 400, 400);
        }

        // Buttons
        drawButton(400, 455, 180, 50, "再来一次", CONFIG.colors.accent);
        drawButton(400, 520, 180, 45, "返回主菜单", "#8B4513");
    }

    // ===========================================
    // DRAWING UTILITIES
    // ===========================================
    function drawButton(x, y, width, height, text, color) {
        ctx.fillStyle = color;
        roundRect(ctx, x - width/2, y - height/2, width, height, 8, true, false);

        ctx.font = "22px KaiTi, STKaiti, serif";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText(text, x, y + 8);
    }

    function drawDecorations() {
        // Background
        if (assetsReady && assets.bg_ink_wash && assets.bg_ink_wash.complete) {
            ctx.drawImage(assets.bg_ink_wash, 0, 0, 800, 600);
        } else {
            ctx.fillStyle = CONFIG.colors.background;
            ctx.fillRect(0, 0, 800, 600);
        }

        // Left bamboo
        if (assetsReady && assets.decor_bamboo_left && assets.decor_bamboo_left.complete) {
            ctx.drawImage(assets.decor_bamboo_left, 0, 150, 80, 400);
        } else {
            ctx.fillStyle = "#3D5A3D";
            ctx.fillRect(10, 180, 12, 350);
            ctx.fillStyle = "#4A6B4A";
            ctx.fillRect(30, 220, 8, 280);
            ctx.beginPath();
            ctx.moveTo(22, 200);
            ctx.quadraticCurveTo(60, 180, 70, 190);
            ctx.quadraticCurveTo(60, 195, 22, 200);
            ctx.fill();
        }

        // Right bamboo
        if (assetsReady && assets.decor_bamboo_right && assets.decor_bamboo_right.complete) {
            ctx.drawImage(assets.decor_bamboo_right, 720, 200, 80, 350);
        } else {
            ctx.fillStyle = "#4A6B4A";
            ctx.fillRect(778, 230, 10, 300);
        }

        // Clouds
        if (assetsReady && assets.decor_cloud && assets.decor_cloud.complete) {
            ctx.globalAlpha = 0.6;
            ctx.drawImage(assets.decor_cloud, 50, 30, 100, 50);
            ctx.drawImage(assets.decor_cloud, 650, 20, 80, 40);
            ctx.globalAlpha = 1;
        } else {
            ctx.fillStyle = "#C0C0C0";
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(80, 60, 25, 0, Math.PI * 2);
            ctx.arc(100, 50, 20, 0, Math.PI * 2);
            ctx.arc(120, 60, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(700, 45, 18, 0, Math.PI * 2);
            ctx.arc(720, 38, 15, 0, Math.PI * 2);
            ctx.arc(735, 45, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (width < 0) width = 0;
        if (height < 0) height = 0;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    // ===========================================
    // EXPOSE GAME STATE FOR TESTING
    // ===========================================
    window.GAME_STATE = {
        get currentIdiom() { return gameState.currentIdiom; },
        get playerInput() { return gameState.playerInput; },
        get score() { return gameState.score; },
        get combo() { return gameState.combo; },
        get maxCombo() { return gameState.maxCombo; },
        get chances() { return gameState.chances; },
        get level() { return gameState.level; },
        get difficulty() { return gameState.difficulty; },
        get progress() { return { ...gameState.progress }; },
        get timer() { return gameState.timer; },
        get history() { return [...gameState.history]; },
        get gameState() { return gameState.gameState; },
        get highScore() { return gameState.highScore; },
        get hintUsed() { return gameState.hintUsed; },

        _testHelpers: {
            submitIdiom: function(idiom) {
                gameState.playerInput = idiom;
                textInput.value = idiom;
                submitAnswer();
            },
            useHint: function() {
                useHint();
            },
            skipIdiom: function() {
                skipIdiom();
            },
            startGame: function(difficulty) {
                startGame(difficulty || "easy");
            },
            pauseGame: function() {
                pauseGame();
            },
            resumeGame: function() {
                resumeGame();
            },
            goToMenu: function() {
                goToMenu();
            },
            getAvailableIdioms: function(lastChar) {
                const levelConfig = CONFIG.levels[gameState.level - 1] || CONFIG.levels[0];
                // Find an idiom with the given last character to get its pinyin
                const idiom = IDIOM_DATABASE.find(i => i.last_char === lastChar);
                if (idiom) {
                    return getAvailableIdioms(idiom.last_char, idiom.last_pinyin, levelConfig.idiomDifficulty);
                }
                // If no match found, just search by character
                return IDIOM_DATABASE.filter(i =>
                    i.first_char === lastChar &&
                    levelConfig.idiomDifficulty.includes(i.difficulty) &&
                    !gameState.usedIdioms.has(i.idiom)
                );
            },
            getIdiomDatabase: function() {
                return IDIOM_DATABASE;
            },
            setTimer: function(value) {
                gameState.timer = value;
            },
            setChances: function(value) {
                gameState.chances = value;
            },
            forceCompleteLevel: function() {
                gameState.progress.current = gameState.progress.required;
                completeLevel();
            }
        }
    };

    // Start the game when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
