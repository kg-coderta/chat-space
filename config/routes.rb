Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
  resources :users, only: [:edit, :update,:index]
  resources :groups, only: [:new, :create, :update,:edit]  do
    resources :messages, only: [:index, :create]
  end
end
