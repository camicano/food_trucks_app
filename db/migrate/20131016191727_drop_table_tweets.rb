class DropTableTweets < ActiveRecord::Migration
  def change
  	drop_table :tweets
  end
end
