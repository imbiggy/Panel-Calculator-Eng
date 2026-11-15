$(function()
{	/* Load時の動作 */
	init_panel();
	init_character();
	character_changed();

	/* イベントハンドラ */
	$("#panel_all").change(panel_all_changed);
	$("#panel_favorit").change(panel_favorit_changed);
	$("#add").click(add_panel);
	$("#del").click(del_panel);
	$("#character_list").change(character_changed);
	$(".panel").dblclick(unset_panel);

	$(".panel_box_panel").draggable({
		helper:		"clone",
		opacity:	0.5,
		stop:		function(event, uis){panel_out()}
	});
	$(".panel").draggable({
		helper:		"clone",
		opacity:	0.5,
		stop:		function(event, uis){panel_out()}
	});
	$(".panel").droppable({
		accept:		".panel, .panel_box_panel",
		drop:		function(event, uis){panel_drop(event, uis)},
		over:		function(event, uis){panel_over(event, uis)}
	});
});

/* パネルリスト初期化 */
function init_panel()
{
	var list = $("#panel_all");
	
	for (var key in panel_name)
	{
		var optgrp = $(document.createElement('optgroup'));
		optgrp.attr("label", key);
		list.append(optgrp);
		for (var idx = 0; idx < panel_name[key].length; idx++)
		{
			var opt = new Option(panel_name[key][idx], idx);
			optgrp.append(opt);
		}
	}
	list.children(":first").children(":first").attr("selected", "selected");
	panel_select();
}

/* キャラクターリスト初期化 */
function init_character()
{
	var list = $("#character_list");

	for (var idx = 0; idx < character_name.length; idx++)
	{
		var opt = new Option(character_name[idx], idx);
		list.append(opt);
	}
}

/* 全パネルリスト変更時の動作 */
function panel_all_changed()
{
	$("#panel_favorit").children(":selected").attr("selected", "");
	panel_select();
}

/* お気に入りパネル変更時の動作 */
function panel_favorit_changed()
{
	$("#panel_all").children().children(":selected").attr("selected", "");
	panel_select();
}

/* パネル背景初期化 */
function init_panel_box()
{
	for (var id = 1; id <= 5; id++)
	{
		var panel = $(eval('"#box_panel" + id'));
		var url = "url(img/L" + id + ".png)";
		panel.css("background-image", url);
	}
}

/* パネル背景を全てL0にする */
function unset_panel_box()
{
	$(".panel_box_panel").text("");
	$(".panel_box_panel").css("background-image", "url(img/L0.png)");
}

/* パネル選択時の動作 */
function panel_select()
{
	var name = $("#character_list").children(":selected").text();
	var text = $("#panel_all").children().children(":selected").text();
	if (text == "")
		text = $("#panel_favorit").children(":selected").text();
	if (text.match(/Atlas|Astraios|Aigaion/) && name != "Judy")
		unset_panel_box();
	else if (text.match(/Fortify/) && name != "Edel")
		unset_panel_box();
	else if (text.match(/Weaponsmith|Accessory Smith/) && name != "Mythe")
		unset_panel_box();
	else if (text.match(/Gauntlet/))
	{
		if (name == "Kurt")
		{
			if ($("#box_panel2").text() == "")
				init_panel_box();
			$(".panel_box_panel").text(text);
		}
		else if (name == "Michelle")
		{
			unset_panel_box();
			$("#box_panel1").text(text);
			$("#box_panel1").css("background-image", "url(img/L1.png)");
		}
		else
			unset_panel_box();
	}
	else if (text.match(/Master Fighter|Weapon Meister|Phobia|Pacifist/))
	{
		unset_panel_box();
		$("#box_panel4").text(text);
		$("#box_panel4").css("background-image", "url(img/L4.png)");
	}
	else if (text.match(/Fortify|Seal/))
	{
		unset_panel_box();
		$("#box_panel3").text(text);
		$("#box_panel3").css("background-image", "url(img/L3.png)");
	}
	else if (text.match(/Tablet/))
	{
		$(".panel_box_panel").text(text);
		$("#box_panel5").text("");
		$("#box_panel5").css("background-image", "url(img/L0.png)");
	}
	else
	{
		if ($("#box_panel5").text() == "")
			init_panel_box();
		$(".panel_box_panel").text(text);
	}
}

/* パネルをお気に入りに追加 */
function add_panel()
{
	var panel = $("#panel_all").children().children(":selected");
	if (panel.text() == "")
		return;
	$("#panel_favorit").append(panel);
}

/* パネルをお気に入りから削除 */
function del_panel()
{
	var panel = $("#panel_favorit").children(":selected");
	if (panel.text() == "")
		return;

	var optgrp;
	/* 該当する optgrp を探す */
	for (var key in panel_name)
	{
		if (jQuery.inArray(panel.text(), panel_name[key]) != -1)
		{
			$("#panel_all").children().each(function(){
				if ($(this).attr("label") == key)
					optgrp = $(this);
			});
		}
	}

	/* 適切な位置に挿入する */
	var idx = parseInt(panel.val());
	var last_panel = optgrp.children(":last");
	if (last_panel.text() == "")
		optgrp.append(panel);
	else if (idx > parseInt(last_panel.val()))
		optgrp.append(panel);
	else
	{
		var after = optgrp.children(":first");
		while (after != last_panel)
		{
			if (idx < parseInt(after.val()))
				break;
			after = after.next();
		}
		after.before(panel);
	}
}

/* パネル名を取得する */
function get_panel_name()
{
	var name = new Array(7);

	for (var idx = 0; idx < 7; idx++)
		name[idx] = $(eval('"#P" + idx')).text();
	return name;
}

/* パネルのレベルを取得する */
function get_panel_level(panel)
{
	var url = panel.css("background-image");
	var match = url.match(/L([0-5])\.png/);
	return match ? parseInt(match[1], 10) : 0;
}

function get_all_panel_level()
{
	var levels = new Array();
	for (var idx = 0; idx < 7; idx++)
	{
		var panel = $(eval('"#P" + idx'));
		levels[idx] = get_panel_level(panel);
	}
	return levels;
}

/* ベース値を取得する */
function get_panel_base_value(name, level)
{
	var value = new Array(10);
	value[0] = panel_data[name[0]][0] * 0.6 * level[0] +
		panel_data[name[1]][0] * 0.6 * level[1] +
		panel_data[name[3]][0] * 0.2 * level[3];
	value[1] = panel_data[name[1]][0] * 0.4 * level[1] +
		panel_data[name[3]][0] * 0.2 * level[3] +
		panel_data[name[4]][0] * 0.8 * level[4];
	value[2] = panel_data[name[3]][0] * 0.2 * level[3] +
		panel_data[name[4]][0] * 0.2 * level[4] +
		panel_data[name[6]][0] * level[6];
	value[3] = panel_data[name[2]][0] * 0.2 * level[2] +
		panel_data[name[3]][0] * 0.2 * level[3] +
		panel_data[name[5]][0] * level[5];
	value[4] = panel_data[name[0]][0] * 0.4 * level[0] +
		panel_data[name[2]][0] * 0.8 * level[2] +
		panel_data[name[3]][0] * 0.2 * level[3];

	value[5] = panel_data[name[0]][1] * level[0] +
		panel_data[name[2]][1] * 0.2 * level[2] +
		panel_data[name[3]][1] * 0.2 * level[3];
	value[6] = panel_data[name[1]][1] * level[1] +
		panel_data[name[3]][1] * 0.2 * level[3] +
		panel_data[name[4]][1] * 0.2 * level[4];
	value[7] = panel_data[name[3]][1] * 0.2 * level[3] +
		panel_data[name[4]][1] * 0.8 * level[4] +
		panel_data[name[6]][1] * 0.4 * level[6];
	value[8] = panel_data[name[3]][1] * 0.2 * level[3] +
		panel_data[name[5]][1] * 0.6 * level[5] +
		panel_data[name[6]][1] * 0.6 * level[6];
	value[9] = panel_data[name[2]][1] * 0.8 * level[2] +
		panel_data[name[3]][1] * 0.2 * level[3] +
		panel_data[name[5]][1] * 0.4 * level[5];

	return value;
}

/* パネルが未使用でタイプが同じか判断する */
function equal_panel_type(
		used,	/* [i] 使用済みフラグ */
		name,	/* [i] パネル名配列 */
		p1,		/* [i] 1つ目のパネル番号 */
		p2,		/* [i] 2つ目のパネル番号 */
		p3)		/* [i] 3つ目のパネル番号 ない場合は2つ目と同じものでも */
{
	var panel1 = panel_data[name[p1]][2];
	var panel2 = panel_data[name[p2]][2];
	var panel3 = panel_data[name[p3]][2];

	if (used[p1] || used[p2] || used[p3])
		return false;
	if (panel1 == panel2 && panel2 == panel3 && panel3 == panel2)
		return true;
	return false;
}

/* パネル同レベルボーナスを取得する */
function get_panel_level_bonus(levels, no1, no2, no3)
{
	if (levels[no1] == levels[no2] && levels[no2] == levels[no3] &&
			levels[no3] == levels[no1])
		return levels[no1];
	return 0;
}

/* ボーナスを加算する */
function add_panel_bonus(
		name,	/* [i] パネル名 */
		type,	/* [i] ボーナスタイプ */
		level,	/* [i] 同レベルボーナス */
		bonus)	/* [o] パネルボーナス */
{
	data = bonus_data[panel_data[name][2]];
	for (var idx = 0; idx < data.length; idx += 4)
		bonus[data[idx]] += data[idx + type] + level;
}

/* ラインボーナスを計算する */
function get_line_bonus(
		name,			/* [i] パネル名配列 */
		levels,			/* [i] パネルレベル配列 */
		data,			/* [i] キャラクターデータ */
		panel_used,		/* [u] パネル使用フラグ */
		bonus)			/* [o] パネルボーナス */
{
	var line = data[1];
	var p = new Array(Array(0, 6), Array(1, 5), Array(2, 4));

	for (var idx = 0; idx < 3; idx++)
	{
		if (line > 2)
			line = 0;
		if (equal_panel_type(panel_used, name, 3, p[line][0], p[line][1]))
		{
			panel_used[3] = true;
			panel_used[p[line][0]] = true;
			panel_used[p[line][1]] = true;
			level = get_panel_level_bonus(levels, 3, p[line][0], p[line][1]);
			add_panel_bonus(name[3], 3, level, bonus);
		}
		line++;
	}
}

/* トライアングルボーナスを計算する */
function get_triangle_bonus(
		name,			/* [i] パネル名配列 */
		levels,			/* [i] パネルレベル配列 */
		data,			/* [i] キャラクターデータ */
		panel_used,		/* [u] パネル使用フラグ */
		bonus)			/* [o] パネルボーナス */
{
	if (equal_panel_type(panel_used, name, 0, 4, 5))
	{
		panel_used[0] = true;
		panel_used[4] = true;
		panel_used[5] = true;
		level = get_panel_level_bonus(levels, 0, 4, 5);
		add_panel_bonus(name[0], 2, level, bonus);
	}

	if (equal_panel_type(panel_used, name, 1, 2, 6))
	{
		panel_used[1] = true;
		panel_used[2] = true;
		panel_used[6] = true;
		level = get_panel_level_bonus(levels, 1, 2, 6);
		add_panel_bonus(name[1], 2, level, bonus);
	}
}

/* ジョイントボーナスを計算する */
function get_joint_bonus(
		name,			/* [i] パネル名配列 */
		levels,			/* [i] パネルレベル配列 */
		data,			/* [i] キャラクターデータ */
		panel_used,		/* [u] パネル使用フラグ */
		bonus)			/* [o] パネルボーナス */
{
	var joint = data[3];
	var p;
	if (data[2])
		p = new Array(Array(0, 1), Array(1, 4), Array(4, 6), Array(6, 5), Array(5, 2), Array(2, 0));
	else
		p = new Array(Array(0, 2), Array(2, 5), Array(5, 6), Array(6, 4), Array(4, 1), Array(1, 0));

	for (var idx = 0; idx < 6; idx++)
	{
		if (joint > 5)
			joint = 0;
		if (equal_panel_type(panel_used, name, p[joint][0], p[joint][1], p[joint][1]))
		{
			panel_used[p[joint][0]] = true;
			panel_used[p[joint][1]] = true;
			level = get_panel_level_bonus(levels, p[joint][0], p[joint][1], p[joint][1]);
			add_panel_bonus(name[p[joint][0]], 1, level, bonus);
		}
		joint++;
	}
}

/* 配置ボーナスを計算する */
function get_panel_bonus(panel_name, level)
{
	var name = $("#character_list").children(":selected").text();
	var data = character_data[name].slice(11);
	var bonus = new Array(10);
	var panel_used = new Array(7);
	for (var idx = 0; idx < 10; idx++)
		bonus[idx] = 0;
	for (var idx = 0; idx < 7; idx++)
		panel_used[idx] = false;

	if (data[0])
	{	/* ライン優先 */
		get_line_bonus(panel_name, level, data, panel_used, bonus);
		get_triangle_bonus(panel_name, level, data, panel_used, bonus);
	}
	else
	{
		get_triangle_bonus(panel_name, level, data, panel_used, bonus);
		get_line_bonus(panel_name, level, data, panel_used, bonus);
	}
	get_joint_bonus(panel_name, level, data, panel_used, bonus);

	/* コンプリートTablet */
	for (var idx = 0; idx < 7; idx++)
	{
		if (!panel_name[idx].match(/Tablet/))
			continue;
		if (!panel_name[idx].match(/Forbidden/))
		{
			bonus[2] += 2;
			bonus[3] += 2;
		}
		bonus[complete_data[panel_name[idx]][0]] += complete_data[panel_name[idx]][1] + level[idx];
	}

	return bonus;
}

/* パラメータを計算する */
function calc_parameter(name, level)
{
	var data = character_data[$("#character_list").children(":selected").text()];
	var bonus = get_panel_bonus(name, level);
	var base = get_panel_base_value(name, level);
	var param = new Array(10);

	for (var idx = 0; idx < 5; idx++)
	{
		var value = Math.floor(base[idx] * (data[idx] + 3) / 64.0 + data[idx]);
		value += bonus[idx];
		param[idx] = value;
	}
	var elem = data[10] + 5;
	for (var idx = 5; idx < 10; idx++)
	{
		if (elem >= 10)
			elem = 5;
		var value = Math.floor(base[idx] * (data[elem] + 3) / 64.0 + data[elem]);
		value += bonus[elem];
		param[elem] = value;
		elem++;
	}
	return param;
}

/* パラメータを更新する */
function update_parameter()
{
	var param = calc_parameter(get_panel_name(), get_all_panel_level());

	for (var idx = 0; idx < 5; idx++)
		$(eval('"#st" + idx')).text(param[idx]);
	for (var idx = 5; idx < 10; idx++)
		$(eval('"#el" + (idx - 5)')).text(param[idx]);
}

function set_preview_parameter(idx, cur, next, st_arrow, st_next)
{
	if (cur[idx] == next[idx])
	{
		st_arrow.text("");
		st_next.text("");
	}
	else
	{
		st_arrow.text(" → ");
		if (cur[idx] < next[idx])
			st_next.css("color", "yellow");
		else
			st_next.css("color", "gray");
		st_next.text(next[idx]);
	}
}

/* パラメータのプレビューを表示する */
function prevew_parameter(cur, next, level_next)
{
	var param_cur = calc_parameter(cur, get_all_panel_level());
	var param_next = calc_parameter(next, level_next);

	for (var idx = 0; idx < 5; idx++)
	{
		arrow = $(eval('"#st" + idx + "_arrow"'));
		next = $(eval('"#st" + idx + "_next"'));
		set_preview_parameter(idx, param_cur, param_next, arrow, next);
	}
	for (var idx = 5; idx < 10; idx++)
	{
		arrow = $(eval('"#el" + (idx - 5) + "_arrow"'));
		next = $(eval('"#el" + (idx - 5) + "_next"'));
		set_preview_parameter(idx, param_cur, param_next, arrow, next);
	}
}

/* パネル配置からパネルを外す */
function unset_panel()
{
	$(this).css("background-image", "url(img/L0.png)");
	$(this).text("");
	update_parameter();
}

/* キャラクター変更時の動作 */
function character_changed()
{
	var name = $("#character_list").children(":selected").text();
	var data = character_data[name];
	var idx = data[10];
	for (var mark = 0; mark < 5; mark++) {
		$("#S" + (mark + 1)).attr("data-multiplier", "(" + data[mark] + ")");
		$("#E" + (mark + 1)).attr("data-multiplier", "(" + data[5 + (data[10] + mark) % 5] + ")");
	}

	for (var ii = 1; ii <= 5; ii++)
	{
		if (idx > 4)
			idx = 0;
		element = $(eval('"#E" + ii'));
		element.text(elem_str[idx++]);
	}
	panel_select();
	update_parameter();
}

/* パネルの個数制限チェック */
function check_panel_number(str, max, pid)
{
	var num = 0;
	for (var idx = 0; idx < 7; idx++)
	{
		if (idx == pid)
			continue;
		var panel = $(eval('"#P" + idx'));
		if (panel.text().match(str))
			num++
	}
	if (num >= max)
		return true;
	return false;
}

/* Familiarのチェック */
function check_familiar(text, pid)
{
	var num = 0;
	for (var idx = 0; idx < 7; idx++)
	{
		if (idx == pid)
			continue;
		var panel = $(eval('"#P" + idx'));
		if (panel.text() == text)
			return true;
		if (panel.text().match(/Familiar/))
			num++;
	}
	if (num >= 3)
		return true;
	return false;
}

/* すでにパネルを配置しているか */
function panel_is_exist(panel, pid)
{
	var text = panel.text();
	var img = panel.css("background-image");
	if (text.match(/Phobia|Pacifist/))
	{
		if (check_panel_number(text, 5, pid))
			return true;
		return false;
	}
	else if (text.match(/Tablet/))
	{
		if (check_panel_number("Tablet", 3, pid))
			return true;
	}
	else if (text.match(/Atlas|Astraios|Aigaion|Familiar/))
	{
		if (check_familiar(text, pid))
			return true;
	}

	for (var idx = 0; idx < 7; idx++)
	{
		if (idx == pid)
			continue;
		var panel = $(eval('"#P" + idx'));
		if (panel.text() == text && panel.css("background-image") == img)
			return true;
	}
	return false;
}

/* パネルを配置にドロップした時の動作 */
function panel_drop(event, uis)
{
	target_bg = $(event.target).css("background-image");
	target_txt = $(event.target).text();
	bgimg = uis.draggable.css("background-image");
	text = uis.draggable.text();

	if (uis.draggable.attr("class").split(" ")[0] == "panel")
	{	/* 交換する */
		uis.draggable.css("background-image", target_bg);
		uis.draggable.text(target_txt);
	}
	else if (panel_is_exist(uis.draggable, $(event.target).attr("id").charAt(1)))
		return;

	$(event.target).css("background-image", bgimg);
	$(event.target).text(text);
	update_parameter();
}

/* パネル番号を取得する */
function get_panel_index(panel)
{
	var id = panel.attr("id");
	return parseInt(id[1]);
}

/* パネルを配置上に乗せた時の動作 */
function panel_over(event, uis)
{
	var name_cur = get_panel_name();
	var name_next = get_panel_name();
	var level_next = get_all_panel_level();

	if (uis.draggable.attr("class").split(" ")[0] == "panel")
	{	/* パネル交換の動作 */
		target = get_panel_index(uis.draggable);
		text = $(event.target).text();
		name_next[target] = text;
		id = $(event.target).attr("id");
		level_next[target] = get_panel_level($(eval('"#" + id')));;
	}
	else if (panel_is_exist(uis.draggable, $(event.target).attr("id").charAt(1)))
		return;

	target = get_panel_index($(event.target));
	text = uis.draggable.text();
	name_next[target] = text;
	id = uis.draggable.attr("id");
	level_next[target] = get_panel_level($(eval('"#" + id')));

	prevew_parameter(name_cur, name_next, level_next);
}

/* パネルを配置上から外した時の動作 */
function panel_out()
{
	for (var idx = 0; idx < 5; idx++)
	{
		arrow = $(eval('"#st" + idx + "_arrow"'));
		arrow.text("");
		arrow = $(eval('"#el" + idx + "_arrow"'));
		arrow.text("");
		next = $(eval('"#st" + idx + "_next"'));
		next.text("");
		next = $(eval('"#el" + idx + "_next"'));
		next.text("");
	}
}
