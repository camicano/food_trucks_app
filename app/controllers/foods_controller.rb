class FoodsController < ApplicationController
	def index
		@response = Food.all 
		@trucks = Truck.all

		respond_to do |format|
			format.json { render :json => @response.to_json }
		end	
	end

	def show
		food = Food.find_type_food(:type_food)
		@trucks = food.trucks

		respond_to do |format|
			format.json { render :json => @trucks.to_json }
		end	

	end
end
