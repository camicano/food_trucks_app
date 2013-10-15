class CreateTweets < ActiveRecord::Migration
  def change
  	create_table :tweets do |t|
  		t.belongs_to :truck
  		t.text :post

  		t.timestamps
  	end
  	add_index :tweets, :truck_id
  end
end
