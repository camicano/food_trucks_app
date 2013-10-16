class FixBug < ActiveRecord::Migration
  def change
  	remove_column :trucks, :tweets
  	add_column :trucks, :tweet_1, :string
  	add_column :trucks, :tweet_2, :string
  	add_column :trucks, :tweet_3, :string
  end
end
