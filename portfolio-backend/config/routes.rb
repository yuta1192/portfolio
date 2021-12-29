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
    resources :profiles, only: [:index, :new, :edit, :update, :create, :destroy]
    resources :my_apps, only: [:index, :new, :edit, :update, :create, :destroy]
    resources :qiitas, only: [:index, :new, :edit, :update, :create, :destroy]
    resources :skills, only: [:index, :new, :edit, :update, :create, :destroy]
    resources :careers, only: [:index, :new, :edit, :update, :create, :destroy]
  end
end
