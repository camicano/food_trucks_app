class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end

	# def tweets
	# 	truck = params[:truck].split('.')
	# 	selected_truck = Truck.find_by_name(truck[0])
	# 	@tweet = selected_truck.tweets
	# 	respond_to do |format|
	# 		format.json { render :json => @tweet.to_json }
	# 	end
	# end
end
