class FoodsController < ApplicationController
	def index
		@response = Food.all

		respond_to do |format|
			format.json { render :json => @response.to_json }
		end	
	end

	def show
		food = params[:type_food].split('.')
		food_type = Food.find_by_type_food(food[0])
		@trucks = food_type.trucks

		respond_to do |format|
			format.json { render :json => @trucks.to_json }
		end	

	end
end
