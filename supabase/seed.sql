-- Life Alchemy Seed Data

-- 默认皮肤
INSERT INTO skins (id, name, description, unlock_type, is_default) VALUES
  ('default_crystal_jar', '水晶罐', '最初的透明水晶罐。', 'default', true),
  ('sage_test_tube', '贤者试管', '蓝色智慧的容器。', 'stone_count', false),
  ('fairy_honey_jar', '精灵蜜罐', '装满快乐的蜜罐。', 'stone_count', false);

-- 基础成就
INSERT INTO achievements (id, name, description, condition_type, condition_value, reward_type, reward_value) VALUES
  ('first_light', '第一颗光', '创建第一颗宝石。', 'total_stones', 1, 'title', '初级炼金师'),
  ('little_collector', '小小收藏家', '累计 10 颗宝石。', 'total_stones', 10, 'frame', 'basic'),
  ('star_jar', '罐中星河', '累计 50 颗宝石。', 'total_stones', 50, 'effect', 'starfield'),
  ('wisdom_apprentice', '智慧学徒', '蓝色宝石 10 颗。', 'type_stones', 10, 'title', '智慧学徒'),
  ('joy_guardian', '快乐守护者', '彩色宝石 10 颗。', 'type_stones', 10, 'effect', 'rainbow'),
  ('memory_station', '回忆补给站', '使用吃颗糖 10 次。', 'memory_draws', 10, 'card_skin', 'memory'),
  ('five_balance', '五色平衡', '五类宝石均达到 5 颗。', 'all_types', 5, 'title', '平衡炼金师');
