var elem_str = new Array("FIR", "EAR", "MET", "WAT", "WOO");

var character_name = new Array(
	"Laura", "Ventus", "Judy", "Kurt", "Ruby", "Mythe", "Armic",
	"Henri", "Francis", "Joseph", "Thomas", "Rebecca", "Marie", "Roy",
	"Sapphire", "Hiro", "Iskandar", "Silver Girl", "Musol Yanii", "Anzan",
	"Platyphyllum", "Tiffon", "Nuage", "Michelle", "Vearst", "Mordeus",
	"Edel", "Armand", "Pharr", "Grace", "Norff", "Kong Ming");

var panel_name = {
	'Attack & evasion':		Array("Punch", "Kick", "Throw", "Dagger", "Sword", "Axe", "Staff", "Spear", "Bow", "Gun", "Shield"),
	"Defense":			Array("Iron Body", "Fortify", "Toughness", "Recovery", "Natural", "Iron Will"),
	"Magic":				Array("Magic Tablet (Fire)", "Magic Tablet (Earth)", "Magic Tablet (Metal)", "Magic Tablet (Water)", "Magic Tablet (Wood)", "Magic Tablet (Forbidden)", "Magic Blender"),
	"Familiars":		Array("Fire Familiar", "Earth Familiar", "Metal Familiar", "Water Familiar", "Wood Familiar", "Atlas", "Astraios", "Aigaion"),
	"Expert":			Array("Master Technician", "Master Magician", "Thrift Saver"),
	"Mastery":		Array("Master Fighter", "Weapon Meister"),
	"Investigation":			Array("Road Guide", "Cave Guide", "Architect Guide", "Obstacle Crossing", "Swimming", "Adaptability"),
	"Support":			Array("Eavesdrop", "Aura", "Sharpeye", "Defuse", "Locksmith"),
	"Negotiation":			Array("Monger", "Maharaja", "Diplomacy", "Inconspicuous", "Fashion"),
	"Items":		Array("Artiste", "Quick Fix", "Weaponsmith", "Accessory Smith"),
	"Mystery":			Array("Fortuneteller", "Arcane Tongue"),
	"Gauntlet":	Array("Gauntlet"),
	"Negative":		Array("Phobia", "Pacifist", "Seal Martial Arts", "Seal Weapon (Dagger)", "Seal Weapon (Sword)", "Seal Weapon (Axe)", "Seal Weapon (Staff)", "Seal Weapon (Spear)", "Seal Weapon (Bow)", "Seal Weapon (Gun)")
};

var bonus_data = new Array(
	/* 対象番号、ジョイント、トライアングル、ラインボーナスの繰り返し */
	Array(),									/*  0 なし */
	Array(0, 2, 4, 6, 4, 2, 4, 6),				/*  1 体術 */
	Array(1, 2, 4, 6, 3, 1, 2, 3, 4, 1, 2, 3),	/*  2 Dagger */
	Array(0, 2, 4, 6, 1, 2, 4, 6),				/*  3 Sword */
	Array(0, 3, 6, 9, 4, 1, 2, 3),				/*  4 Axe */
	Array(2, 2, 4, 6, 4, 1, 3, 3),				/*  5 Staff */
	Array(0, 2, 4, 6, 4, 2, 4, 6),				/*  6 Spear */
	Array(0, 2, 4, 6, 1, 2, 4, 6),				/*  7 Bow */
	Array(1, 4, 9, 12),							/*  8 Gun */
	Array(4, 4, 9, 12),							/*  9 Shield */
	Array(4, 4, 9, 12),							/* 10 Defense */
	Array(5, 1, 2, 3, 6, 1, 2, 3, 7, 1, 2, 3, 8, 1, 2, 3, 9, 1, 2, 3),	/* 11 Magic */
	Array(2, 1, 2, 3, 3, 3, 6, 9),				/* 12 Familiar */
	Array(2, 3, 6, 9, 3, 1, 2, 3),				/* 13 大型Familiar */
	Array(1, 2, 4, 6, 2, 2, 4, 6),				/* 14 Expert */
	Array(0, 1, 2, 3, 1, 1, 2, 3, 2, 1, 2, 3, 4, 1, 2, 3),	/* 15 Mastery */
	Array(4, 2, 4, 6, 8, 2, 4, 6),				/* 16 Investigation */
	Array(1, 2, 4, 6, 6, 2, 4, 6),				/* 17 Support */
	Array(2, 2, 4, 6, 9, 2, 4, 6),				/* 18 Negotiation */
	Array(1, 3, 6, 9, 7, 2, 4, 6),				/* 19 Items */
	Array(3, 3, 6, 9, 5, 2, 4, 6),				/* 20 Mystery */
	Array(0, 2, 4, 6, 3, 6, 9, 12),				/* 21 Phobia */
	Array(2, 3, 6, 9, 3, 3, 6, 9),				/* 22 Pacifist */
	Array(0, 2, 4, 6, 2, 4, 9, 12)				/* 23 Seal */
);

var complete_data = {
	"Magic Tablet (Fire)":	Array(5, 0),
	"Magic Tablet (Earth)":	Array(6, 0),
	"Magic Tablet (Metal)":	Array(7, 0),
	"Magic Tablet (Water)":	Array(8, 0),
	"Magic Tablet (Wood)":	Array(9, 0),
	"Magic Tablet (Forbidden)":	Array(3, 5)
};

var panel_data = {
	/* 能力基本値 五行基本地 配置ボーナスタイプ */
	"":					Array( 0,  0,  0),
	"Punch":			Array(80, 20,  1),
	"Kick":			Array(80, 20,  1),
	"Throw":				Array(70, 30,  1),
	"Dagger":				Array(60, 40,  2),
	"Sword":				Array(70, 30,  3),
	"Axe":				Array(80, 20,  4),
	"Staff":				Array(40, 60,  5),
	"Spear":				Array(70, 30,  6),
	"Bow":				Array(60, 40,  7),
	"Gun":				Array(60, 20,  8),
	"Shield":				Array(60, 40,  9),
	"Iron Body":			Array(90, 20, 10),
	"Fortify":				Array(10, 50, 10),
	"Toughness":			Array(75, 25, 10),
	"Recovery":			Array(30, 70, 10),
	"Natural":		Array(65, 35, 10),
	"Iron Will":			Array(60, 40, 11),
	"Magic Tablet (Fire)":		Array(35, 65, 11),
	"Magic Tablet (Earth)":		Array(35, 65, 11),
	"Magic Tablet (Metal)":		Array(35, 65, 11),
	"Magic Tablet (Water)":		Array(35, 65, 11),
	"Magic Tablet (Wood)":		Array(35, 65, 11),
	"Magic Tablet (Forbidden)":		Array(35, 65, 11),
	"Magic Blender":			Array(70, 40, 11),
	"Fire Familiar":	Array(15, 65, 12),
	"Earth Familiar":	Array(15, 65, 12),
	"Metal Familiar":	Array(15, 65, 12),
	"Water Familiar":	Array(15, 65, 12),
	"Wood Familiar":	Array(15, 65, 12),
	"Atlas":		Array(10, 70, 13),
	"Astraios":	Array(10, 70, 13),
	"Aigaion":		Array(10, 70, 13),
	"Master Technician":			Array(70, 10, 14),
	"Master Magician":			Array(10, 70, 14),
	"Thrift Saver":			Array(40, 40, 14),
	"Master Fighter":	Array(70, 20, 15),
	"Weapon Meister":	Array(60, 30, 15),
	"Road Guide":			Array(25, 70, 16),
	"Cave Guide":			Array(25, 70, 16),
	"Architect Guide":		Array(30, 60, 16),
	"Obstacle Crossing":		Array(60, 35, 16),
	"Swimming":				Array(65, 25, 16),
	"Adaptability":			Array(55, 45, 16),
	"Eavesdrop":			Array(25, 65, 17),
	"Aura":		Array(50, 40, 17),
	"Sharpeye":			Array(30, 60, 17),
	"Defuse":			Array(65, 25, 17),
	"Locksmith":			Array(70, 20, 17),
	"Monger":			Array(50, 30, 18),
	"Maharaja":		Array(30, 50, 18),
	"Diplomacy":				Array(20, 60, 18),
	"Inconspicuous":				Array(15, 65, 18),
	"Fashion":			Array(15, 65, 18),
	"Artiste":			Array(40, 40, 19),
	"Quick Fix":			Array(60, 20, 19),
	"Weaponsmith":			Array(55, 25, 19),
	"Accessory Smith":		Array(55, 25, 19),
	"Fortuneteller":				Array(20, 80, 20),
	"Arcane Tongue":	Array(70, 50, 20),
	"Gauntlet":		Array(95, 15,  0),
	"Phobia":			Array(35, 70, 21),
	"Pacifist":		Array(50, 55, 22),
	"Seal Martial Arts":			Array(65, 45, 23),
	"Seal Weapon (Dagger)":	Array(70, 40, 23),
	"Seal Weapon (Sword)":	Array(70, 40, 23),
	"Seal Weapon (Axe)":		Array(65, 45, 23),
	"Seal Weapon (Staff)":		Array(70, 40, 23),
	"Seal Weapon (Spear)":		Array(65, 45, 23),
	"Seal Weapon (Bow)":		Array(70, 40, 23),
	"Seal Weapon (Gun)":		Array(80, 30, 23)
}

var character_data = {
	/* 力 技 心 魔 体 火 土 金 水 木
	 * 左上資質の番号 ライン優先 優先ライン番号 ジョイントが時計回り 優先ジョイント番号 */
	"Laura":			Array(4, 1, 4, 2, 3, 4, 2, 2, 1, 1, 1, false, 2, true,  3),
	"Ventus":			Array(3, 2, 4, 3, 5, 3, 4, 1, 1, 1, 4, true,  1, false, 4),
	"Judy":			Array(1, 5, 2, 5, 5, 3, 3, 1, 2, 3, 2, true,  0, true,  0),
	"Kurt":		Array(2, 2, 2, 3, 3, 3, 1, 1, 3, 2, 2, false, 0, false, 2),
	"Ruby":			Array(3, 1, 4, 4, 4, 4, 1, 1, 2, 2, 2, false, 0, false, 1),
	"Mythe":			Array(2, 3, 4, 3, 1, 3, 1, 1, 4, 1, 3, true,  1, false, 1),
	"Armic":		Array(3, 2, 2, 2, 5, 0, 1, 3, 4, 2, 4, true,  2, false, 0),
	"Henri":			Array(3, 4, 3, 4, 2, 2, 3, 1, 1, 3, 4, true,  1, true,  1),
	"Francis":		Array(4, 4, 5, 1, 4, 2, 2, 2, 1, 3, 0, false, 2, true,  2),
	"Joseph":		Array(1, 4, 3, 4, 3, 3, 3, 2, 1, 1, 3, false, 1, false, 3),
	"Thomas":			Array(4, 4, 2, 1, 1, 4, 2, 1, 2, 1, 2, true,  0, true,  5),
	"Rebecca":			Array(4, 2, 1, 5, 3, 3, 1, 1, 1, 4, 1, true,  2, true,  0),
	"Marie":			Array(2, 5, 3, 5, 2, 3, 1, 3, 1, 2, 4, false, 1, true,  1),
	"Roy":				Array(2, 3, 5, 3, 2, 3, 1, 2, 2, 2, 1, false, 2, false, 2),
	"Sapphire":		Array(2, 4, 4, 4, 5, 4, 1, 2, 1, 2, 3, false, 2, true,  5),
	"Hiro":			Array(4, 3, 3, 1, 4, 2, 3, 1, 3, 1, 3, true,  2, true,  5),
	"Iskandar":	Array(4, 4, 3, 3, 3, 3, 2, 1, 3, 1, 1, false, 0, true,  4),
	"Silver Girl":			Array(3, 1, 5, 5, 1, 2, 2, 2, 2, 2, 0, true,  1, true,  1),
	"Musol Yanii":	Array(5, 1, 5, 3, 2, 1, 3, 4, 2, 0, 3, true,  2, true,  2),
	"Anzan":			Array(2, 1, 5, 2, 4, 3, 4, 2, 0, 1, 0, false, 1, true,  4),
	"Platyphyllum":	Array(3, 3, 2, 2, 3, 2, 0, 1, 3, 4, 2, false, 0, true,  0),
	"Tiffon":		Array(1, 3, 2, 3, 1, 3, 2, 2, 2, 1, 0, true,  0, true,  3),
	"Nuage":			Array(5, 2, 2, 1, 3, 2, 1, 1, 3, 3, 3, false, 0, true,  4),
	"Michelle":			Array(5, 5, 3, 2, 2, 2, 1, 1, 4, 2, 3, true,  1, false, 4),
	"Vearst":			Array(1, 2, 4, 4, 1, 2, 2, 1, 3, 2, 2, false, 0, false, 3),
	"Mordeus":	Array(4, 2, 3, 4, 3, 2, 3, 1, 2, 2, 0, false, 1, true,  3),
	"Edel":			Array(5, 5, 1, 2, 5, 2, 2, 3, 2, 1, 0, true,  1, false, 1),
	"Armand":			Array(5, 5, 3, 1, 1, 4, 2, 1, 1, 2, 1, true,  0, false, 0),
	"Pharr":			Array(3, 3, 4, 2, 2, 2, 1, 2, 2, 3, 0, false, 2, false, 0),
	"Grace":			Array(1, 3, 1, 3, 5, 2, 2, 3, 1, 2, 2, true,  0, true,  2),
	"Norff":			Array(3, 3, 1, 5, 4, 2, 2, 1, 2, 3, 2, false, 1, false, 0),
	"Kong Ming":		Array(2, 4, 1, 4, 4, 2, 3, 2, 1, 2, 1, true,  2, false, 0)
}
