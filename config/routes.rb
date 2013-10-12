FoodTruckApp::Application.routes.draw do
  # devise_for :users

get '/trucks/finder' => 'trucks#finder'

root :to => 'trucks#index'
end
