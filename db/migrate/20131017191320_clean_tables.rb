class CleanTables < ActiveRecord::Migration
  def change
  	remove_column :trucks, :tweet1
  	remove_column :trucks, :tweet2
  	remove_column :trucks, :tweet3
  	remove_column :trucks, :tag
  	remove_column :trucks, :web_url
  	remove_column :trucks, :photo_url
  	remove_column :trucks, :updated
  end
end
