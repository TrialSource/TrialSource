class MakeConditionsSeperateTable < ActiveRecord::Migration
  def change
    create_table :conditions do |t|
      t.string :name
      t.integer :trial_id

      t.timestamps null: false
    end
    remove_column :trials, :condition
  end
end
