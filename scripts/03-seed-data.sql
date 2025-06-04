-- Insert sample products
INSERT INTO public.products (name, description, category, price, rating, review_count, image_url, features, pros, cons) VALUES
('LifeStraw Personal Water Filter', 'Removes 99.9999% of waterborne bacteria and 99.9% of waterborne protozoan parasites', 'Water Filtration', 19.95, 4.5, 1250, '/placeholder.svg?height=300&width=300', 
 ARRAY['Filters up to 1,000 gallons', 'No chemicals or batteries', 'Ultralight at 2oz'], 
 ARRAY['Extremely lightweight', 'Easy to use', 'Reliable filtration'], 
 ARRAY['Cannot filter viruses', 'Limited to 1000 gallons']),

('Sawyer Products MINI Water Filtration System', 'Award-winning filtration technology removes harmful bacteria and protozoa', 'Water Filtration', 24.95, 4.7, 890, '/placeholder.svg?height=300&width=300',
 ARRAY['Filters up to 100,000 gallons', 'Attaches to bottles', 'Backwashable'],
 ARRAY['Long-lasting filter', 'Versatile attachment options', 'Great flow rate'],
 ARRAY['Slightly heavier than competitors', 'Requires backwashing maintenance']),

('Anker PowerCore 10000 Portable Charger', 'Ultra-compact 10000mAh external battery with high-speed charging technology', 'Electronics', 35.99, 4.6, 2100, '/placeholder.svg?height=300&width=300',
 ARRAY['10000mAh capacity', 'PowerIQ technology', 'MultiProtect safety system'],
 ARRAY['Compact size', 'Fast charging', 'Reliable brand'],
 ARRAY['No wireless charging', 'Single USB-A port']),

('Emergency Mylar Thermal Blankets', 'NASA-designed mylar blankets retain 90% of body heat', 'Shelter', 12.99, 4.3, 567, '/placeholder.svg?height=300&width=300',
 ARRAY['Pack of 4 blankets', 'Windproof and waterproof', 'Compact storage'],
 ARRAY['Extremely lightweight', 'Effective heat retention', 'Multi-purpose use'],
 ARRAY['Can tear easily', 'Noisy material', 'Single use typically']);

-- Insert sample articles
INSERT INTO public.articles (title, slug, excerpt, content, category, tags, featured, published, read_time, image_url) VALUES
('Essential Water Purification Methods for Survival', 'water-purification-survival', 'Learn the most effective ways to purify water in emergency situations', 'Water is essential for survival, and knowing how to purify it can save your life...', 'Water & Food', ARRAY['water', 'purification', 'survival'], true, true, 8, '/placeholder.svg?height=400&width=600'),

('Building Your First Bug Out Bag: Complete Guide', 'first-bug-out-bag-guide', 'A comprehensive guide to assembling your emergency evacuation kit', 'A bug out bag is your lifeline during emergencies. Here''s how to build one...', 'Gear', ARRAY['bug-out-bag', 'emergency', 'preparedness'], true, true, 12, '/placeholder.svg?height=400&width=600'),

('Urban Survival: Thriving in City Emergencies', 'urban-survival-guide', 'Unique challenges and solutions for surviving emergencies in urban environments', 'Urban survival presents unique challenges different from wilderness survival...', 'Urban Survival', ARRAY['urban', 'city', 'emergency'], false, true, 10, '/placeholder.svg?height=400&width=600'),

('Food Storage Basics: Long-term Preservation', 'food-storage-basics', 'Essential techniques for storing food for long-term emergency preparedness', 'Proper food storage is crucial for emergency preparedness...', 'Water & Food', ARRAY['food', 'storage', 'preservation'], false, true, 15, '/placeholder.svg?height=400&width=600');
