FoodTruckApp::Application.routes.draw do
	devise_for :users

	get '/trucks', :to => 'trucks#index'
	get '/foods', :to => 'foods#index'
	get '/foods/show/:type_food', :to => 'foods#show'
	get '/trucks/tweets/:tweet1', :to => 'trucks#tweets'
	
	root :to => 'trucks#index'
end
