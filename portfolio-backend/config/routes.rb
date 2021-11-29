Rails.application.routes.draw do
  devise_for :users
  resources :posts
  resources :my_apps, only: [:index]
  resources :careers, only: [:index]
  resources :profiles, only: [:index]
  resources :qiitas, only: [:index]
end
