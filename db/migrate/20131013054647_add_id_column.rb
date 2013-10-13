class AddIdColumn < ActiveRecord::Migration
  def change
  	add_column :trucks, :foursq_id, :string
  end
end
