class AddTweets < ActiveRecord::Migration
  def change
  	remove_column :trucks, :tweet1
  	remove_column :trucks, :tweet2
  	remove_column :trucks, :tweet3
  	remove_index :tweets, :truck_id

  	add_column :trucks, :twitter, :string
  end
end
