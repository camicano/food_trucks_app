FoodTruckApp::Application.routes.draw do
	devise_for :users

	get '/trucks', :to => 'trucks#index'
	get '/foods', :to => 'foods#index'
	root :to => 'trucks#index'
end
