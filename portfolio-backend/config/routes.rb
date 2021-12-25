Rails.application.routes.draw do
  devise_for :users
  resources :my_apps, only: [:index]
  resources :careers, only: [:index]
  resources :profiles, only: [:index]
  resources :qiitas, only: [:index]
  resources :skills, only: [:index, :show]
  resources :contacts, only: [:create]
  resources :users do
    collection do
      post 'user_select'
    end
  end

  namespace :admin do
    resources :top, only: [:index]
    resources :profiles, only: [:index, :new, :edit, :update, :create]
  end
end
