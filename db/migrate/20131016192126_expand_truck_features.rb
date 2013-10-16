class ExpandTruckFeatures < ActiveRecord::Migration
  def change
  	remove_column :trucks, :foursq_id
  	add_column :trucks, :web_url, :string
  	add_column :trucks, :updated, :string
  	add_column :trucks, :tag, :string  
  end
end
